import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

class GymHelpOrderController {
  async index(req, res) {
    const help_order = await HelpOrder.findAll({
      where: {
        answered_at: null,
      },
      include: [
        {
          model: Student,
          as: 'Student',
          attributes: ['name'],
        },
      ],
      order: ['created_at'],
    });

    return res.json(help_order);
  }

  async update(req, res) {
    const { id } = req.params;
    const { answer } = req.body;

    const help_order = await HelpOrder.findByPk(id);
    if (!help_order) {
      return res.status(400).json({ error: 'Question does not exist' });
    }
    const answered_at = new Date();
    const result = await help_order.update({
      answer,
      answered_at,
    });

    const student = await Student.findByPk(result.student_id);
    const student_first_name = student.name.split(' ', 1);

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'questionsAndAnswers',
      context: {
        student_first_name: student_first_name[0],
        created_at: format(help_order.created_at, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        answered_at: format(result.answered_at, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        question: result.question,
        answer: result.answer,
      },
    });

    return res.json(result);
  }
}

export default new GymHelpOrderController();

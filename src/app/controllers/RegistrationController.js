import { addDays, addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';

import Mail from '../../lib/Mail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'Student',
          attributes: [['name', 'student_name']],
        },
        {
          model: Plan,
          as: 'Plan',
          attributes: [
            ['title', 'title'],
            ['duration', 'duration'],
            ['price', 'month_price'],
          ],
        },
      ],
      order: ['id'],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body; // pega variaveis do body
    const student = await Student.findByPk(student_id);
    const student_first_name = student.name.split(' ', 1);
    const plan = await Plan.findByPk(plan_id); // busca dados do plano

    const start_date_conv = parseISO(start_date); // converte e trunca data de inicio
    const end_date = addDays(addMonths(start_date_conv, plan.duration), -1); // calcula a data de fim de acordo com o plano

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: start_date_conv,
      end_date,
      price: plan.duration * plan.price,
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Confirmada',
      template: 'registration',
      context: {
        student_first_name: student_first_name[0],
        student: student.name,
        plan: plan.title,
        duration: plan.duration,
        start_date: format(registration.start_date, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        end_date: format(registration.end_date, "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        price: registration.price,
      },
    });

    return res.json(registration);
  }

  async update(req, res) {
    const registration = await Registration.findByPk(req.params.id, {
      include: [
        {
          model: Plan,
          as: 'Plan',
          attributes: ['duration'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'Matricula não existe' });
    }

    const { start_date, plan_id } = req.body;
    const plan = await Plan.findByPk(plan_id); // busca dados do plano
    const convertedStartDate = parseISO(start_date);

    if (plan && convertedStartDate) {
      const result = await registration.update({
        plan_id,
        start_date: convertedStartDate,
        end_date: addMonths(convertedStartDate, plan.duration),
      });
      return res.json(result);
    }
    if (!plan && convertedStartDate) {
      const result = await registration.update({
        start_date: convertedStartDate,
        end_date: addDays(
          addMonths(convertedStartDate, registration.Plan.duration),
          -1
        ),
      });

      return res.json(result);
    }
    return res.json({ error: 'A start date is necessary' });
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Matricula não existe' });
    }
    await registration.destroy();

    return res.json();
  }
}
export default new RegistrationController();

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    const help_order = await HelpOrder.findAll({
      where: {
        student_id: req.params.id,
      },
      order: [['created_at', 'DESC']],
    });

    return res.json(help_order);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const help_order = await HelpOrder.create({
      student_id: id,
      question,
    });
    return res.json(help_order);
  }
}

export default new HelpOrderController();

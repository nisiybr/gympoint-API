import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
      order: [['created_at', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    const today = endOfDay(new Date());
    const startSearch = startOfDay(subDays(today, 6));

    const checkinAmount = await Checkin.findAndCountAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [startSearch, today],
        },
      },
    });
    if (checkinAmount.count >= 5) {
      return res
        .status(400)
        .json({ error: 'Checkin amount exceeed, 5 times in 7 days.' });
    }

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();

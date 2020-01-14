import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q } = req.query;
    if (!q) {
      const filter = { order: [['id', 'ASC']] };
      const students = await Student.findAll(filter);
      return res.json(students);
    }
    const filter = {
      where: {
        name: {
          [Op.substring]: q,
        },
      },
      order: [['id', 'ASC']],
    };
    const students = await Student.findAll(filter);
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findOne({
      where: { email: req.body.email },
    });

    if (student) {
      return res
        .status(400)
        .json({ error: 'O endereço de e-mail já está sendo utilizado' });
    }

    const { name, email, age, weight, height } = await Student.create(req.body);

    return res.json({
      student: {
        name,
        email,
        age,
        weight,
        height,
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!student) {
      return res.status(401).json({ error: 'Student does not exist' });
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      name,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não existe' });
    }
    try {
      await student.destroy();
      return res.json();
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluir o aluno' });
    }
  }
}
export default new StudentController();

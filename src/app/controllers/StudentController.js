import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
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
      return res.status(401).json({ error: 'Student already exists' });
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
}
export default new StudentController();

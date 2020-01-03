import Student from '../models/Student';

class StudentLoginController {
  async index(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(400).json({ error: 'Student does not exist' });
      }
      return res.json(student);
    } catch (err) {
      return res.status(400).json({ error: 'Falha na autenticação' });
    }
  }
}
export default new StudentLoginController();

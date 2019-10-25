import { startOfDay, addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';

import Mail from '../../lib/Mail';

class RegistrationController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body; // pega variaveis do body

    const student = await Student.findByPk(student_id);
    const student_first_name = student.name.split(' ', 1);
    const plan = await Plan.findByPk(plan_id); // busca dados do plano

    const start_date_conv = startOfDay(parseISO(start_date)); // converte e trunca data de inicio
    const end_date = addMonths(start_date_conv, plan.duration); // calcula a data de fim de acordo com o plano

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
}
export default new RegistrationController();

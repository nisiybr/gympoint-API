import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      order: ['price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    const plan = await Plan.create(req.body);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const schema2 = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });
    if (!(await schema2.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }
    await Plan.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(plan);
  }
}
export default new PlanController();

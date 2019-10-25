import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.get('/help-orders', GymHelpOrderController.index);
routes.post('/help-orders/:id/answer', GymHelpOrderController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registration', RegistrationController.store);
routes.get('/registration', RegistrationController.index);
routes.put('/registration/:id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

export default routes;

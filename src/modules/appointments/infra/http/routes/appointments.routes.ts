import { Router, request, response } from 'express';
import ensureAuthenticatedService from '@modules/users/infra/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
appointmentsRouter.use(ensureAuthenticatedService);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;

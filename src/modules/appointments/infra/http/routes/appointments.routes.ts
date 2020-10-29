import { Router, request, response } from 'express';
import ensureAuthenticatedService from '@modules/users/infra/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
appointmentsRouter.use(ensureAuthenticatedService);
// appointmentsRouter.get('/', async (request, response) => {

//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;

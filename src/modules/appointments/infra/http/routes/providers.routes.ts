import { Router, request, response } from 'express';
import ensureAuthenticatedService from '@modules/users/infra/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const ProvidersRouter = Router();
const appointmentController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

ProvidersRouter.use(ensureAuthenticatedService);

ProvidersRouter.get('/', appointmentController.index);
ProvidersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
ProvidersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default ProvidersRouter;

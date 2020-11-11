import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppError from '@shared/erros/AppError';
import UsersController from '../controllers/SessionsController';

const sessions = Router();
const usersController = new UsersController();
sessions.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default sessions;

import { Router } from 'express';
import AppError from '@shared/erros/AppError';
import UsersController from '../controllers/SessionsController';

const sessions = Router();
const usersController = new UsersController();
sessions.post('/', usersController.create);

export default sessions;

import {Router} from 'express';
import AppError from '../erros/AppError';


import AuthenticateUserService from '../services/AuthenticateUserService';

const sessions = Router();

sessions.post('/', async(request, response) =>{

    const { email, password} =  request.body;

    const authenticateUser = new AuthenticateUserService();

    const {user, token} = await authenticateUser.excecute({
        email,
        password,
    });

    return response.json({user, token});

});

export default sessions;
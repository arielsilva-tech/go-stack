import {getRepository} from 'typeorm';
import User from '../model/user';
import AuthConfig from '../config/auth';
import {hash, compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import AppError from '../erros/AppError';
interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

class AuthenticateUserService{
    public async excecute({email, password}: Request):Promise<Response>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({where: {email}});

        if(!user){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const {secret, expiresIn} = AuthConfig.jwt;
        const token = sign({ }, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
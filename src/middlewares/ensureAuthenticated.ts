import { Request, Response, NextFunction, request } from "express";
import {verify} from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../erros/AppError';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request :Request, response: Response, next: NextFunction): void{

    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const decode = verify(token, AuthConfig.jwt.secret);    
        
        const { sub } = decode as TokenPayload;

        request.user = {
            id: sub,
        };
        
        console.log(decode);
        return next();

    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }
    
}
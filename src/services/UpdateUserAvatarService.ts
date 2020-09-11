import {getRepository} from 'typeorm';
import User from '../model/user';
import UploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '../erros/AppError';


interface Request{
    user_id: string;
    avatarFileName: string;
}
class UpdateUserAvatarService{
    public async execute({ user_id, avatarFileName}: Request): Promise<User>{
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change Avatar', 401);
        }
        
        if(user.avatar){
            const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            //deleta arquivo
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import User from '@modules/users/infra/typeorm/entities/user';
import { id } from 'date-fns/locale';
import IHasprovider from '../providers/HashProvider/models/IHasprovider';
import IUsersRepository from '../repositories/IUsersRepository';
import usersRouter from '../infra/http/routes/users.routes';

/* eslint-disable camelcase */
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('Hasprovider')
    private hasprovider: IHasprovider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userSameEmail = await this.userRepository.findByEmail(email);

    if (userSameEmail && userSameEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Old password is requierd');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hasprovider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hasprovider.generateHash(password);
    }

    return user;
  }
}

export default UpdateProfileService;

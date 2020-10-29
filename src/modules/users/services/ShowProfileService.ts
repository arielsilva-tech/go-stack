import { inject, injectable } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '../repositories/IUsersRepository';

/* eslint-disable camelcase */
interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;

import { inject, injectable } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

/* eslint-disable camelcase */
interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      exceptUserId: user_id,
    });

    if (!users) {
      throw new AppError('User not found');
    }

    return users;
  }
}

export default ListProvidersService;

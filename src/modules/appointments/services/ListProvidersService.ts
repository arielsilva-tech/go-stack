import { inject, injectable } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

/* eslint-disable camelcase */
interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );
    // let users;

    if (!users) {
      users = await this.userRepository.findAllProviders({
        exceptUserId: user_id,
      });

      if (!users) {
        throw new AppError('User not found');
      }

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }
    return users;
  }
}

export default ListProvidersService;

import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/erros/AppError';
import { inject, injectable } from 'tsyringe';
import { addHours, differenceInHours, isAfter } from 'date-fns';
import IMailProvider from '@shared/container/providers/MailProvider/Models/IMailProvider';
import { compare } from 'bcryptjs';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHasprovider from '../providers/HashProvider/models/IHasprovider';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('Hasprovider')
    private hasprovider: IHasprovider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exist');
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User token does not exist');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hasprovider.generateHash(password);

    await this.userRepository.save(user);
  }
}
export default ResetPasswordService;

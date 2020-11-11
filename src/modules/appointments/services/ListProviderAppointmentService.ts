import { inject, injectable } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import { Index } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';

/* eslint-disable camelcase */
interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointmens = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        providerId,
        year,
        month,
        day,
      },
    );
    return appointmens;
  }
}
export default ListProviderAppointmentService;

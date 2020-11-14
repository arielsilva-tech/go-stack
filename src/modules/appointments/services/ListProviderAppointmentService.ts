import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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

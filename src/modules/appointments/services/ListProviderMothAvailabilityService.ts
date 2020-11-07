import { inject, injectable } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import { Index } from 'typeorm';

/* eslint-disable camelcase */
interface IRequest {
  providerId: string;
  month: number;
  year: number;
}
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMothAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        providerId,
        year,
        month,
      },
    );
    const numberOfDayInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      { length: numberOfDayInMonth },
      (_, index) => index + 1,
    );

    const nowDate = new Date(Date.now());

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available:
          isAfter(compareDate, nowDate) && appointmentsInDay.length < 10,
      };
    });
    return availability;
  }
}
export default ListProviderMothAvailabilityService;

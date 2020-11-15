/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const { day, month, year } = request.query;
    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const appointments = await listProviderAppointmentService.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}

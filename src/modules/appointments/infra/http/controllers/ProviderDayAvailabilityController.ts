/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { day, month, year } = request.query;

    // const parsedDate = parseISO(date);
    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const availability = await listProviderDayAvailabilityService.execute({
      providerId: provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}

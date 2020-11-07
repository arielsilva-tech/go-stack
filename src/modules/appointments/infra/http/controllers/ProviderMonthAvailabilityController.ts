/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListProviderMothAvailabilityService from '@modules/appointments/services/ListProviderMothAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year } = request.body;

    // const parsedDate = parseISO(date);
    const listProviderMothAvailabilityService = container.resolve(
      ListProviderMothAvailabilityService,
    );
    const availability = await listProviderMothAvailabilityService.execute({
      providerId: provider_id,
      month,
      year,
    });
    return response.json(availability);
  }
}

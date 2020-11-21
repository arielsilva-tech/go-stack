import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    // const parsedDate = parseISO(date);
    const listProvidersService = container.resolve(ListProvidersService);
    const providers = await listProvidersService.execute({
      user_id: userId,
    });
    return response.json(classToClass(providers));
  }
}

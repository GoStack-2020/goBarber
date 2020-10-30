import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    //Instância do service
    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    //Execução do service
    const availability = await listProviderDayAvailability.execute({ provider_id, day, month, year });

    //Retorno da execução do service
    return response.json(availability);
  }
}

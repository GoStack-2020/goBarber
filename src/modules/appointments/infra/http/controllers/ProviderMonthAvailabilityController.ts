import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    //Instância do service
    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    //Execução do service
    const availability = await listProviderMonthAvailability.execute({ provider_id, month, year });

    //Retorno da execução do service
    return response.json(availability);
  }
}

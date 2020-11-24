import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    //Instância do service
    const listProviders = container.resolve(ListProvidersService);

    //Execução do service
    const providers = await listProviders.execute({ user_id });

    //Retorno da execução do service
    return response.json(classToClass(providers));
  }
}

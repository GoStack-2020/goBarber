import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    //Instância do service
    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    //Execução do service
    const appointments = await listProviderAppointments.execute({ provider_id, day, month, year });

    //Retorno da execução do service
    return response.json(appointments);
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    //Instância do service
    const createAppointment = container.resolve(CreateAppointmentService);

    //Execução do service
    const appointment = await createAppointment.execute({ provider_id, user_id, date });

    //Retorno da execução do service
    return response.json(appointment);
  }
}

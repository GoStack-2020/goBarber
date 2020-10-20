import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    //Tratamento de data
    const parsedDate = parseISO(date);

    //Instância do service
    const createAppointment = container.resolve(CreateAppointmentService);

    //Execução do service
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    //Retorno da execução do service
    return response.json(appointment);
  }
}

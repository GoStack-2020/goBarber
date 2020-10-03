import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

/* Recebimento das informações
Tratativa de erros/exceções
Acesso ao repositório */

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

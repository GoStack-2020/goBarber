import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// Rota recebendo requisição
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    //Tratamento de data
    const parsedDate = parseISO(date);

    //Instância do service
    const createAppointment = new CreateAppointmentService();

    //Execução do service
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    //Retorno da execução do service
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

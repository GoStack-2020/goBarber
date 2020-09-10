import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// Rota recebendo requisição
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  //Tratamento de data
  const parsedDate = parseISO(date);

  //Instância do service
  const createAppointment = new CreateAppointmentService();

  //Execução do service
  const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

  //Retorno da execução do service
  return response.json(appointment);
});

export default appointmentsRouter;

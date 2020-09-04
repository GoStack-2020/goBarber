import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

// Rota recebendo requisição
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    //Tratamento de data
    const parsedDate = parseISO(date);
    //Instância do service
    const createAppointment = new CreateAppointmentService(appointmentsRepository);
    //Execução do service
    const appointment = createAppointment.execute({ provider, date: parsedDate });
    //Retorno da execução do service
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

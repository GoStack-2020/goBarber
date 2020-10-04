import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// Rota recebendo requisição
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  //Tratamento de data
  const parsedDate = parseISO(date);

  //Instância do service
  const createAppointment = container.resolve(CreateAppointmentService);

  //Execução do service
  const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

  //Retorno da execução do service
  return response.json(appointment);
});

export default appointmentsRouter;

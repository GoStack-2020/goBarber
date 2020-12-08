"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async create(request, response) {
    const user_id = request.user.id;
    const {
      provider_id,
      date
    } = request.body; //Instância do service

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default); //Execução do service


    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date
    }); //Retorno da execução do service

    return response.json(appointment);
  }

}

exports.default = AppointmentController;
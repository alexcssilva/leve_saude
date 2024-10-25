import {
  IAppointmentRequest,
  IAppointmentResponse,
} from "../interface/AppointmentInterface";

export const mockAppointmentRequest: IAppointmentRequest = {
  medico_id: 1,
  paciente_nome: "Carlos Almeida",
  data_horario: "2024-10-05 09:00",
};

export const mockAppointmentResponse: IAppointmentResponse = {
  mensagem: "Agendamento realizado com sucesso",
  agendamento: {
    medico: "Dr. João Silva",
    paciente: "Carlos Almeida",
    data_horario: "2024-10-05 09:00",
  },
};

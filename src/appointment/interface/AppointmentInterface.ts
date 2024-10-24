export interface IAppointmentRequest {
  medico_id: number;
  paciente_nome: string;
  data_horario: string;
}

export interface IAppointmentResponse {
  mensagem: string;
  agendamento: {
    medico: string;
    paciente: string;
    data_horario: string;
  };
}

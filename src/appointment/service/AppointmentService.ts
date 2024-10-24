import { ScheduleService } from "../../schedule/service/scheduleService";
import {
  IAppointmentRequest,
  IAppointmentResponse,
} from "../interface/AppointmentInterface";

export class AppointmentService {
  private scheduleService: ScheduleService;

  constructor() {
    this.scheduleService = new ScheduleService();
  }

  public async createAgendamento(
    data: IAppointmentRequest
  ): Promise<IAppointmentResponse> {
    const medico = await this.scheduleService.getDoctorById(data.medico_id);

    if (!medico) {
      throw new Error("Médico não encontrado");
    }

    if (!medico.horarios_disponiveis.includes(data.data_horario)) {
      throw new Error("Horário não disponível");
    }

    return {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        medico: medico.nome,
        paciente: data.paciente_nome,
        data_horario: data.data_horario,
      },
    };
  }
}

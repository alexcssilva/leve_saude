import { IAppointmentRequest } from ".././appointment/interface/AppointmentInterface";
import { mockAppointmentResponse } from ".././appointment/mocks/appointmentMock";
import { AppointmentService } from ".././appointment/service/AppointmentService";
import { ScheduleService } from ".././schedule/service/scheduleService";

jest.mock(".././schedule/service/scheduleService");

describe("AppointmentService", () => {
  let appointmentService: AppointmentService;
  let scheduleServiceMock: jest.Mocked<ScheduleService>;

  beforeEach(() => {
    scheduleServiceMock = new ScheduleService() as jest.Mocked<ScheduleService>;
    appointmentService = new AppointmentService();
    (appointmentService as any).scheduleService = scheduleServiceMock;
  });

  test("Deve criar um agendamento usando mock", async () => {
    const request: IAppointmentRequest = {
      medico_id: 1,
      paciente_nome: "Paciente Teste",
      data_horario: "2023-10-10T10:00:00",
    };

    const response = await appointmentService.createAgendamento(request, true);

    expect(response).toEqual(mockAppointmentResponse);
  });

  test("Deve lançar erro se o médico não for encontrado", async () => {
    const request: IAppointmentRequest = {
      medico_id: 1,
      paciente_nome: "Paciente Teste",
      data_horario: "2023-10-10T10:00:00",
    };

    scheduleServiceMock.getDoctorById.mockResolvedValue(undefined);

    await expect(appointmentService.createAgendamento(request)).rejects.toThrow(
      "Médico não encontrado"
    );
  });

  test("Deve lançar erro se o horário não estiver disponível", async () => {
    const request: IAppointmentRequest = {
      medico_id: 1,
      paciente_nome: "Paciente Teste",
      data_horario: "2023-10-10T10:00:00",
    };

    scheduleServiceMock.getDoctorById.mockResolvedValue({
      id: 1,
      nome: "Dr. Teste",
      especialidade: "Cardiologia",
      horarios_disponiveis: ["2023-10-10T11:00:00"],
    });

    await expect(appointmentService.createAgendamento(request)).rejects.toThrow(
      "Horário não disponível"
    );
  });
});

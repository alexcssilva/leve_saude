import { doctorsMock } from "../schedule/mocks/scheduleMock";
import { ScheduleService } from "../schedule/service/scheduleService";

describe("Serviço de Agendamento", () => {
  let scheduleService: ScheduleService;

  beforeEach(() => {
    scheduleService = new ScheduleService();
  });

  describe("obterAgendamentos", () => {
    it("deve retornar todos os agendamentos dos médicos", async () => {
      const result = await scheduleService.getSchedules();
      expect(result).toEqual({ medicos: doctorsMock });
    });
  });

  describe("obterMedicoPorId", () => {
    it("deve retornar o médico quando encontrado", async () => {
      const result = await scheduleService.getDoctorById(1);
      expect(result).toEqual(doctorsMock[0]);
    });

    it("deve retornar indefinido quando o médico não for encontrado", async () => {
      const result = await scheduleService.getDoctorById(999);
      expect(result).toBeUndefined();
    });
  });
});

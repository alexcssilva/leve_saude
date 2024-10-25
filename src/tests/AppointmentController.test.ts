import { APIGatewayProxyEvent } from "aws-lambda";
import { validate } from "class-validator";
import { createAppointment } from ".././appointment/controller/AppointmentController";
import { AppointmentService } from ".././appointment/service/AppointmentService";
import { mockAppointmentResponse } from "../appointment/mocks/appointmentMock";

jest.mock(".././appointment/service/AppointmentService");
jest.mock("class-validator");

const appointmentServiceMock = AppointmentService as jest.MockedClass<
  typeof AppointmentService
>;
const validateMock = validate as jest.MockedFunction<typeof validate>;

describe("createAppointment", () => {
  let event: APIGatewayProxyEvent;

  beforeEach(() => {
    event = {
      body: JSON.stringify({
        medico_id: 1,
        paciente_nome: "Carlos Almeida",
        data_horario: "2024-10-05 09:00",
      }),
    } as APIGatewayProxyEvent;
    appointmentServiceMock.prototype.createAgendamento.mockResolvedValue(
      mockAppointmentResponse
    );
  });

  it("deve retornar 400 se o corpo da requisição estiver ausente", async () => {
    event.body = null;

    const response = await createAppointment(event);

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain("Missing request body");
  });

  it("deve retornar 400 se a validação dos dados falhar", async () => {
    validateMock.mockResolvedValueOnce([
      {
        property: "medico_id",
        constraints: { isInt: "deve ser um número inteiro" },
      },
    ]);

    const response = await createAppointment(event);

    expect(response.statusCode).toBe(400);
    expect(response.body).toContain("Validation failed");
  });

  it("deve retornar 201 e os dados do agendamento se a criação for bem-sucedida", async () => {
    validateMock.mockResolvedValueOnce([]); // Sem erros de validação

    const response = await createAppointment(event);

    expect(response.statusCode).toBe(201);
    expect(response.body).toContain("Agendamento realizado com sucesso");
    expect(response.body).toContain("Dr. João Silva");
  });
});

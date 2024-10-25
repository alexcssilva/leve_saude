import { APIGatewayProxyResult } from "aws-lambda";
import { getSchedules } from "../schedule/controller/ScheduleController";
import { doctorsMock } from "../schedule/mocks/scheduleMock";
import { ScheduleService } from "../schedule/service/scheduleService";

jest.mock("../schedule/service/scheduleService");

const scheduleMock = doctorsMock.map((doctor) => ({
  id: doctor.id,
  name: doctor.nome,
}));

describe("ScheduleController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma lista de agendamentos com status 200", async () => {
    (ScheduleService.prototype.getSchedules as jest.Mock).mockResolvedValue(
      scheduleMock
    );

    const result: APIGatewayProxyResult = await getSchedules();

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify(scheduleMock));
    expect(result.headers).toEqual({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
  });

  it("deve retornar erro 500 quando ocorrer uma exceção", async () => {
    (ScheduleService.prototype.getSchedules as jest.Mock).mockRejectedValue(
      new Error("Erro interno")
    );

    const result: APIGatewayProxyResult = await getSchedules();

    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(
      JSON.stringify({ message: "Internal server error" })
    );
    expect(result.headers).toEqual({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
  });

  it("deve retornar uma lista vazia quando não houver agendamentos", async () => {
    (ScheduleService.prototype.getSchedules as jest.Mock).mockResolvedValue([]);

    const result: APIGatewayProxyResult = await getSchedules();

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify([]));
    expect(result.headers).toEqual({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
  });
});

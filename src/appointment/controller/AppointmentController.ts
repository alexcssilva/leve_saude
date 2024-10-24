import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validate } from "class-validator";
import { AppointmentDTO } from "../dto/AppointmentDto";
import { AppointmentService } from "../service/AppointmentService";

const appointmentService = new AppointmentService();

export const createAppointment = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing request body" }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    const data = JSON.parse(event.body);
    const appointmentDto = new AppointmentDTO();
    Object.assign(appointmentDto, data);

    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Validation failed", errors }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    const result = await appointmentService.createAgendamento(data);

    return {
      statusCode: 201,
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

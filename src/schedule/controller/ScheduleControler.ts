import { APIGatewayProxyResult } from "aws-lambda";
import { ScheduleService } from "../service/scheduleService";

const scheduleService = new ScheduleService();

export const getSchedules = async (): Promise<APIGatewayProxyResult> => {
  try {
    const schedules = await scheduleService.getSchedules();

    return {
      statusCode: 200,
      body: JSON.stringify(schedules),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
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

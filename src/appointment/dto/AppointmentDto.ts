import { IsDateString, IsNumber, IsString } from "class-validator";

export class AppointmentDTO {
  @IsNumber()
  medico_id!: number;

  @IsString()
  paciente_nome!: string;

  @IsDateString()
  data_horario!: string;
}

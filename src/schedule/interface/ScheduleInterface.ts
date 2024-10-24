export interface IDoctor {
  id: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
}

export interface IScheduleResponse {
  medicos: IDoctor[];
}

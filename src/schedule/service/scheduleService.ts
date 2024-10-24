import { IDoctor, IScheduleResponse } from "../interface/ScheduleInterface";
import { doctorsMock } from "../mocks/scheduleMock";

export class ScheduleService {
  private doctors: IDoctor[];

  constructor() {
    this.doctors = doctorsMock;
  }

  public async getSchedules(): Promise<IScheduleResponse> {
    return {
      medicos: this.doctors,
    };
  }

  public async getDoctorById(id: number): Promise<IDoctor | undefined> {
    return this.doctors.find((doctor) => doctor.id === id);
  }
}

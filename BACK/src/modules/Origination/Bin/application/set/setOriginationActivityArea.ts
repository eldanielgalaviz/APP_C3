import { ActivityAreaRepository } from "../../../domain/Repositories/OriginationActivityAreaRepository";

export class setActivityArea {
  constructor(private repository: ActivityAreaRepository) {
  }
  async run(data: any, userId: number): Promise<any> {
    return this.repository.setActivityAreaRepository(data, userId);     
  }   
}
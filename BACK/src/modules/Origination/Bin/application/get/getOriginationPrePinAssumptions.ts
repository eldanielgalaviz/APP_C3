import { PrePinAssumptionsRepository } from "../../../domain/Repositories/OriginationPrePinoAssumptionsRepository";

export class getPrePinAssumptions {
  constructor(private repository: PrePinAssumptionsRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getPrePinAssumptionsRepository(idProject);
  } 
}
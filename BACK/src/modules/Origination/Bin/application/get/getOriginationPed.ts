import { PedRepository } from "../../../domain/Repositories/OriginationPedRepository";

export class getPed {
  constructor(private repository: PedRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getPedRepository(idProject);
  }
}
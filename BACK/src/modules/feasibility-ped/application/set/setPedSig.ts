import { PedRepository } from "../../domain/Repositories/OriginationPedRepository";
import { PedSigRequest } from "../../domain/Request/OriginationPEDRequest";

export class setPedSig {
  constructor(private repository: PedRepository) {}

  async run(data: PedSigRequest, userId: number): Promise<any> {
    return this.repository.setPedSigRepository(data, userId);
  }
}
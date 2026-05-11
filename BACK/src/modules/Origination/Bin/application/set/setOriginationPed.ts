import { PedRepository } from "../../../domain/Repositories/OriginationPedRepository";
import { PedRequest } from "../../../domain/Request/OriginationPEDRequest";

export class setPed {
  constructor(private repository: PedRepository) { }

  async run(data: PedRequest, userId: number): Promise<PedRequest> {
    return this.repository.setPedRepository(data, userId);
  }
}
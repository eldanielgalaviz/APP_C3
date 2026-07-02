import { PedRepository } from "../../domain/Repositories/OriginationPedRepository";
import { PedOriginationRequest } from "../../domain/Request/OriginationPEDRequest";

export class setPedOrigination {
  constructor(private repository: PedRepository) {}

  async run(data: PedOriginationRequest, userId: number): Promise<any> {
    return this.repository.setPedOriginationRepository(data, userId);
  }
}
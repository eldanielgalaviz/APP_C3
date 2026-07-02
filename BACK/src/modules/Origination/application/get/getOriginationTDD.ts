import { TddMilestoneRepository } from "../../domain/Repositories/OriginationCatalogsRepository";

export class getMilestonesTDD {
  constructor(private repository: TddMilestoneRepository) {}

  async run(): Promise<any> {
    return this.repository.getMilestonesTDD();
  }
}

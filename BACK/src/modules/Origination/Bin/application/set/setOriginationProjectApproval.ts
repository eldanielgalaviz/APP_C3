import { ProjectApprovalRepository } from "../../../domain/Repositories/OriginationProjectApprovalRepository";

export class setProjectApproval {
  constructor(private repository: ProjectApprovalRepository) { }

  async run(data: any, userId: number): Promise<any> {
    return this.repository.setProjectApprovalRepository(data, userId);
  } 
}
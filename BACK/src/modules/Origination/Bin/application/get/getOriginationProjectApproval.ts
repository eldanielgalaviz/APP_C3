import { ProjectApprovalRepository } from "../../../domain/Repositories/OriginationProjectApprovalRepository";

export class getProjectApproval {
  constructor(private repository: ProjectApprovalRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getProjectApprovalRepository(idProject);
  } 
}
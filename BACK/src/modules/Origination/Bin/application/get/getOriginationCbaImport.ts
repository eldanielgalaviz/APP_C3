import { CbaImportRepository } from "../../../domain/Repositories/OriginationCbaImportRepository";

export class getCbaImport {
  constructor(private repository: CbaImportRepository) {}

  async run(idProject: number): Promise<any> {
    return this.repository.getcbaImportRepository(idProject);
  }
}
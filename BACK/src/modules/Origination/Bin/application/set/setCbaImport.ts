import { CbaImportRepository } from "../../../domain/Repositories/OriginationCbaImportRepository";

export class setCbaImport {
  constructor(private repository: CbaImportRepository) { }
  async run(data: any, userId: number): Promise<any> {
    return this.repository.setcbaImportRepository(data, userId);
  }
}
import { CatalogsRepository } from "../domain/UserCatalogsRepository";

export class getUserCatalog {
  constructor(private repository: CatalogsRepository) {}

  async run(ctName: string): Promise<any> {
    return this.repository.getUserCatalog(ctName);
  }
}
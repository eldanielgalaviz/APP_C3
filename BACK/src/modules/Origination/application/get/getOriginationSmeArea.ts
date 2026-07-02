import { CatalogSmeAreaRepository } from "../../domain/Repositories/OriginationCatalogsRepository";

export class getSmeArea {
  constructor(private repository: CatalogSmeAreaRepository) {}

  async run(): Promise<any> {
    return this.repository.getOriginationSmeArea();
  }
}
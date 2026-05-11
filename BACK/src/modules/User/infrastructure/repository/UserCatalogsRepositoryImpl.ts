import { getCatalogs } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { CatalogsRepository } from "../../domain/UserCatalogsRepository";

export class CatalogsUserRepositoryImpl implements CatalogsRepository {
  async getUserCatalog(catalogName: string): Promise<any> {
    return await getCatalogs(catalogName);
  }
}
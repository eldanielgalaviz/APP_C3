export interface CatalogsRepository {
  getUserCatalog(spName: string): Promise<any>;
}
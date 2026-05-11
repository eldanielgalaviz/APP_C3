import { getCatalogs, getMunicipalities, getNeighborhoodsByMunicipality, getLocationByCP } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';
import { CatalogLocationByCPRepository, CatalogNeighborhoodRepository, CatalogsRepository, CatalogStateRepository } from '../../domain/Repositories/OriginationCatalogsRepository';
import { executeStoredProcedure } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';

export class CatalogsRepositoryImpl implements CatalogsRepository {
  async getCatalog(catalogName: string): Promise<any> {
    return await getCatalogs(catalogName);
  }

  async getMunicipalitiesByState(idState: number):  Promise<any>{
    const result = await executeStoredProcedure('sp_get_municipalities_by_state', [idState]);
    return result[0];
  }

  async getAgrarianNucleusByMunicipality(idState: number):  Promise<any>{
    const result = await executeStoredProcedure('sp_get_agrarian_nucleus_by_municipality', [idState]);
    return result[0];
  }
}

export class CatalogStateRepositoryImpl implements CatalogStateRepository {
  async getMunicipality(idState: number): Promise<any>{
    return await getMunicipalities(idState)
  }
}

export class CatalogNeighborhoodRepositoryImpl implements CatalogNeighborhoodRepository {
  async getNeighborhood(idNeigborhood: number): Promise<any>{
    return await getNeighborhoodsByMunicipality(idNeigborhood)
  }
}

export class CatalogLocationByCPRepositoryImpl implements CatalogLocationByCPRepository {
  async getLocationByCP(postalcode: number): Promise<any>{
    return await getLocationByCP(postalcode)
  }
}
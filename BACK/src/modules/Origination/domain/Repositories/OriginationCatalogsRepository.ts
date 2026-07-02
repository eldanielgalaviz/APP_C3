export interface CatalogsRepository {

  getCatalog(spName: string): Promise<any>;
}

export interface TddMilestoneRepository {
  getMilestonesTDD(): Promise<any[]>;
}

export interface CatalogStateRepository {
  getMunicipality(idState: number): Promise<any>;
}

export interface CatalogNeighborhoodRepository {
  getNeighborhood(idState: number): Promise<any>;
}

export interface CatalogLocationByCPRepository {
  getLocationByCP(postalCode: number): Promise<any>;
}

export interface CatalogMunicipalitiesByState {
  getMunicipalitiesByState(idState: number): Promise<any>;
}

export interface CatalogAgrarianNucleusByMunicipality {
  getAgrarianNucleusByMunicipality(idState: number): Promise<any>;
}

export interface CatalogSmeAreaRepository {
  getOriginationSmeArea(): Promise<any[]>;
}
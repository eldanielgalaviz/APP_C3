import { CatalogAgrarianNucleusByMunicipality, CatalogLocationByCPRepository, CatalogMunicipalitiesByState, CatalogNeighborhoodRepository, CatalogsRepository, CatalogStateRepository } from '../domain/Repositories/OriginationCatalogsRepository';

export class getCatalog {
  constructor(private repository: CatalogsRepository) {}

  async run(spName: string): Promise<any> {
    return this.repository.getCatalog(spName);
  }
}

export class getMunicipalities{
  constructor(private repository: CatalogStateRepository) {}
    async run(idState: number): Promise<any>{
    return this.repository.getMunicipality(idState);
  }
}

export class getNeighborhoods{
  constructor(private repository: CatalogNeighborhoodRepository) {}
    async run(idNeighborhood: number): Promise<any>{
    return this.repository.getNeighborhood(idNeighborhood);
  }
}

export class getNeighborhoodGeneral{
  constructor(private repository: CatalogNeighborhoodRepository) {}
    async run(idNeighborhood: number): Promise<any>{
    return this.repository.getNeighborhood(idNeighborhood);
  }
}

export class getLocationByCP{
  constructor(private repository: CatalogLocationByCPRepository) {}
    async run(postalcode: number): Promise<any>{
    return this.repository.getLocationByCP(postalcode);
  }
}

export class getMunicipalitiesByState{
  constructor(private repository: CatalogMunicipalitiesByState) {}
    async run(idState: number): Promise<any>{
    return this.repository.getMunicipalitiesByState(idState);
  }
}

export class getAgrarianNucleusByMunicipality{
  constructor(private repository: CatalogAgrarianNucleusByMunicipality) {}
    async run(idState: number): Promise<any>{
    return this.repository.getAgrarianNucleusByMunicipality(idState);
  }
}
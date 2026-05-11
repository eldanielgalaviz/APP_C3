// src/shared/ServiceContainer.ts

/** REPOSITORIOS */

/** CASOS DE USO - AUTH */
import { UserRepositoryImpl } from '../modules/User/infrastructure/repository/UserRepositoryImpl';
import { LoginRepositoryImpl } from '../modules/login/infrastructure/repository/LoginRepositoryImpl';

/** CASOS DE USO - USER */
import { getUsers } from '../modules/User/Bin/application/getUsers';
import { setUsers } from '../modules/User/Bin/application/setUsers';
import { LoginUseCase } from '../modules/login/Bin/application/LoginUseCase';
import { RefreshTokenUseCase } from '../modules/login/Bin/application/RefreshTokenUseCase';

/** CASO DE USO CATALOGOS */
import { CatalogLocationByCPRepositoryImpl, CatalogNeighborhoodRepositoryImpl, CatalogsRepositoryImpl, CatalogStateRepositoryImpl } from '../modules/Origination/infraestructure/repository/OriginationCatalogsRepositoryImpl';
import { getUsersMenu } from '../modules/User/Bin/application/getMenu';
import { getUserCatalog } from '../modules/User/Bin/application/getUserCatalogs';
import { CatalogsUserRepositoryImpl } from '../modules/User/infrastructure/repository/UserCatalogsRepositoryImpl';
import { getAgrarianNucleusByMunicipality, getCatalog, getLocationByCP, getMunicipalities, getMunicipalitiesByState, getNeighborhoods } from '../modules/Origination/Bin/application/getCatalog';

// === INSTANCIAS ÚNICAS ===
const userRepository = new UserRepositoryImpl();
const loginRepository = new LoginRepositoryImpl(userRepository);
const catalogsRepository = new CatalogsRepositoryImpl();
const catalogsUserRepository = new CatalogsUserRepositoryImpl();
const catalogStateRepository = new CatalogStateRepositoryImpl()
const catalogsNeighborhoods = new CatalogNeighborhoodRepositoryImpl()
const catalogslocationByCP = new CatalogLocationByCPRepositoryImpl()
const catalogsMunicipalitiesByState = new CatalogsRepositoryImpl();
const catalogsAgrarianNucleusByMunicipality = new CatalogsRepositoryImpl();

export { userRepository, 
         loginRepository, 
         catalogsRepository, 
         catalogStateRepository, 
         catalogsNeighborhoods, 
         catalogslocationByCP, 
         catalogsMunicipalitiesByState, 
         catalogsAgrarianNucleusByMunicipality, 
      };

export const ServiceContainer = {
  user: {
    getUsers: new getUsers(userRepository),
    setUsers: new setUsers(userRepository),
    getUserMenu: new getUsersMenu(userRepository),
    catalogs: {
      getUserCatalogs: new getUserCatalog(catalogsUserRepository),
    }
  },
  auth: {
    loginUseCase: new LoginUseCase(loginRepository),
    refreshTokenUseCase: new RefreshTokenUseCase(loginRepository)
  },
  catalogos: {
      getCatalog: new getCatalog(catalogsRepository),
      getMunicipalities: new getMunicipalities(catalogStateRepository),
      getNeighborhoodsByMuncipality: new getNeighborhoods(catalogsNeighborhoods),
      getNeighborhoods: new getNeighborhoods(catalogsNeighborhoods),
      getLocationByCP: new getLocationByCP(catalogslocationByCP),
      getMunicipalitiesByState: new getMunicipalitiesByState(catalogsMunicipalitiesByState),
      getAgrarianNucleusByMunicipality: new getAgrarianNucleusByMunicipality(catalogsAgrarianNucleusByMunicipality)
  },

};
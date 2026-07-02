// src/shared/ServiceContainer.ts

/** CASOS DE USO - AUTH */
import { UserRepositoryImpl } from '../../modules/user/infrastructure/repository/UserRepositoryImpl';
import { LoginRepositoryImpl } from '../../modules/auth/infrastructure/repository/LoginRepositoryImpl';

/** CASOS DE USO - USER */
import { getUsers } from '../../modules/user/application/getUsers';
import { setUsers } from '../../modules/user/application/setUsers';
import { LoginUseCase } from '../../modules/auth/application/LoginUseCase';
import { RefreshTokenUseCase } from '../../modules/auth/application/RefreshTokenUseCase';
import { setUserProfileImage } from '../../modules/user/application/setUserProfileImage';

/** CASO DE USO CATALOGOS */
import { CatalogLocationByCPRepositoryImpl, CatalogNeighborhoodRepositoryImpl, CatalogsRepositoryImpl, CatalogStateRepositoryImpl } from '../../modules/origination/infraestructure/repository/OriginationCatalogsRepositoryImpl';
import { getUsersMenu } from '../../modules/user/application/getMenu';
import { getUserCatalog } from '../../modules/user/application/getUserCatalogs';
import { CatalogsUserRepositoryImpl } from '../../modules/user/infrastructure/repository/UserCatalogsRepositoryImpl';
import { getAgrarianNucleusByMunicipality, getCatalog, getLocationByCP, getMunicipalities, getMunicipalitiesByState, getNeighborhoods } from '../../modules/origination/application/getCatalog';
import { getUserProfileImage } from '../../modules/user/application/getUserProfileImage';
import { getMilestonesTDD } from '../../modules/origination/application/get/getOriginationTDD';
import { getSmeArea } from '../../modules/origination/application/get/getOriginationSmeArea';
import { OriginationSmeAreaRepositoryImpl } from '../../modules/origination/infraestructure/repository/OriginationSmeAreaRepositoryImpl';

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
const catalogsSme = new OriginationSmeAreaRepositoryImpl();

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
    },
    setUserProfileImage: new setUserProfileImage(userRepository),
    getUserProfileImage: new getUserProfileImage(userRepository),
  },
  auth: {
    loginUseCase: new LoginUseCase(loginRepository, userRepository),
    refreshTokenUseCase: new RefreshTokenUseCase(loginRepository)
  },
  catalogos: {
      getCatalog: new getCatalog(catalogsRepository),
      getMunicipalities: new getMunicipalities(catalogStateRepository),
      getNeighborhoodsByMuncipality: new getNeighborhoods(catalogsNeighborhoods),
      getNeighborhoods: new getNeighborhoods(catalogsNeighborhoods),
      getLocationByCP: new getLocationByCP(catalogslocationByCP),
      getMunicipalitiesByState: new getMunicipalitiesByState(catalogsMunicipalitiesByState),
      getAgrarianNucleusByMunicipality: new getAgrarianNucleusByMunicipality(catalogsAgrarianNucleusByMunicipality),
      getMilestonesTDD: new getMilestonesTDD(catalogsRepository),
      getSmeByArea: new getSmeArea(catalogsSme),
  },
 
};
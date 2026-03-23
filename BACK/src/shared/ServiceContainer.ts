// src/shared/ServiceContainer.ts

/** REPOSITORIOS */
import { UserRepositoryImpl } from '../modules/User/infrastructure/repository/UserRepositoryImpl';
import { LoginRepositoryImpl } from '../modules/login/infrastructure/repository/LoginRepositoryImpl';
import { OriginationRepositoryImpl } from '../modules/Origination/infraestructure/repository/OriginationRepositoryImpl';

/** CASOS DE USO - USER */
import { getUsers } from '../modules/User/Bin/application/getUsers';
import { setUsers } from '../modules/User/Bin/application/setUsers';
import { LoginUseCase } from '../modules/login/Bin/application/LoginUseCase';
import { RefreshTokenUseCase } from '../modules/login/Bin/application/RefreshTokenUseCase';
import { set } from 'zod';

/** CASO DE USO ORIGINACIÓN */
import { getOrigination } from '../modules/Origination/Bin/application/getOrigination';
import { setOrigination } from '../modules/Origination/Bin/application/setOrigination';

/** CASOS DE USO - AUTH */

// === INSTANCIAS ÚNICAS ===
const userRepository = new UserRepositoryImpl();
const loginRepository = new LoginRepositoryImpl(userRepository);
const originationRepository = new OriginationRepositoryImpl();

export const ServiceContainer = {
  user: {
    getUsers: new getUsers(userRepository),
    setUsers: new setUsers(userRepository)
  },
  auth: {
    loginUseCase: new LoginUseCase(loginRepository),
    refreshTokenUseCase: new RefreshTokenUseCase(loginRepository)
  },
  origination: {
    // Aqui se agregarán los casos de uso de originación
    setOrigination: new setOrigination(originationRepository),
    getOrigination: new getOrigination(originationRepository)
  }
};
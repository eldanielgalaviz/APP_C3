// src/modules/User/infrastructure/repository/UserRepositoryImpl.ts
import { executeStoredProcedure, executeViews } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';
import { UserRepository } from '../../domain/exceptions/UserRepository';
import { CreateUserRequest } from '../../domain/CreateUserRequest';
import * as bcrypt from 'bcrypt';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(): Promise<CreateUserRequest[]> {
    const result = await executeViews('vw_user');
    return result[0];
  }

  async findByEmail(email: string): Promise<CreateUserRequest | null> {
    const result = await executeStoredProcedure('sp_getUserByEmail', [email]);
    const rows = result[0];
    return rows.length > 0 ? rows[0] : null;
  }

  async setUsers(user: CreateUserRequest): Promise<void> {
    let hashedPassword = '';
    if(user.PasswordHash !== ''){
      hashedPassword = await bcrypt.hash(user.PasswordHash, 10);
    } else {
      const existingUser = await this.findByEmail(user.Email);
      if (existingUser) {
        hashedPassword = existingUser.PasswordHash;
      } else {
        throw new Error('La contraseña es obligatoria para un nuevo usuario');
      }
    }
    const values = [
      user.Iduser,
      user.Name,
      user.AP,
      user.AM ?? null,
      user.Email,
      hashedPassword,
      user.puesto,
      user.departamento,
      user.Idlocationkey,
      user.Idstatususer,
      user.Idpositionuser,
      1
    ];

    await executeStoredProcedure('sp_setUsers', values);
  }

  async saveRefreshToken(Iduser: number, refreshToken: string): Promise<void> {
    await executeStoredProcedure('sp_saveRefreshToken', [Iduser, refreshToken]);
  }

  async userPermissions(Iduser: number): Promise<void>{
    const result = await await executeStoredProcedure('sp_getUserContextJSON', [Iduser]);
    const rows = result[0];
    return rows ?? null;
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    await executeStoredProcedure('sp_invalidateRefreshToken', [refreshToken]);
  }

  async getUserMenu(userId: number): Promise <any[]>{
    const result = await executeStoredProcedure('sp_getUserMenusJSON', [userId]);
    return result[0];
  }

  async setUserProfileImage(userId: number, url_img: string): Promise<void> {
    const result = await executeStoredProcedure('sp_set_user_profile_image', [userId, url_img]);
    return result[0];
  }

  async getUserProfileImage(userId: number): Promise<void> {
    const result = await executeStoredProcedure('sp_get_user_profile_image', [userId]);
    return result[0];
  }

}
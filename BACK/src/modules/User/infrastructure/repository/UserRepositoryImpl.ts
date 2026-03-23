// src/modules/User/infrastructure/repository/UserRepositoryImpl.ts
import { executeStoredProcedure } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';
import { UserRepository } from '../../domain/exceptions/UserRepository';
import { CreateUserRequest } from '../../domain/CreateUserRequest';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export class UserRepositoryImpl implements UserRepository {
  async getUsers(): Promise<CreateUserRequest[]> {
    const result = await executeStoredProcedure('sp_getUsers', []);
    return result[0].map((row: any) => this.toDomain(row));
  }

  async findByEmail(email: string): Promise<CreateUserRequest | null> {
    const result = await executeStoredProcedure('sp_getUserByEmail', [email]);
    const rows = result[0];
    return rows.length > 0 ? this.toDomain(rows[0]) : null;
  }
async setUsers(user: CreateUserRequest): Promise<void> {
   const hashedPassword = await bcrypt.hash(user.PasswordHash, 10);
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
    user.Idusertype,
    user.Idpositionuser,
    // user.Idoperationmenu,
    // user.user_create ?? new Date().toISOString()
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

  // Mapea fila de BD → Entidad CreateUserRequest con sus Value Objects
  
  private toDomain(row: any): CreateUserRequest {
    const userData = {
      Iduser: Number(row.Iduser),
      Name: row.Name,
      AP: row.AP,
      AM: row.AM || undefined,
      Email: row.Email,
      PasswordHash: row.PasswordHash,
      puesto: row.Puesto,
      departamento: row.Departamento,
      Idlocationkey: row.IdLocationKey,
      Idstatususer: row.Status,
      Idusertype: row.IdUserType,
      Idpositionuser: row.IdPositionUser || undefined,
      // Idoperationmenu: row.IdOperationMenu || undefined,
      user_create: row.user_create || undefined,
    };

    return plainToInstance(CreateUserRequest, userData);
}
}
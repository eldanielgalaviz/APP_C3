import { CreateUserRequest } from "../CreateUserRequest";

export interface UserRepository {
  getUsers(): Promise<CreateUserRequest[]>;
  setUsers(user: CreateUserRequest): Promise<void>;
  findByEmail(Email: string): Promise<CreateUserRequest | null>;
  saveRefreshToken(Iduser: number, refreshToken: string): Promise<void>;
  userPermissions(Iduser: number): Promise<void>;
  invalidateRefreshToken(refreshToken: string): Promise<void>;
}
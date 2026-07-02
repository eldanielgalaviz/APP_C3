import { LoginCredentials } from './LoginCredentials';
import { AuthTokens } from './AuthTokens';

export interface LoginRepository {
  /**
   * Valida las credenciales del usuario
   */
  validateUser(credentials: LoginCredentials): Promise<boolean>;


  generateTokens(Iduser: number, email: string): Promise<AuthTokens>;

  invalidateTokens(refreshToken: string): Promise<void>;

  validateToken(token: string): Promise<any>;
}
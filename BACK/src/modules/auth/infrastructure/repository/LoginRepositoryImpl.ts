
import { PasswordHasher } from '../../../../shared/security/PasswordHasher';
import { JwtService } from '../../../../shared/middleware/JwtService';
import { AuthTokens } from '../../domain/AuthTokens';
import { LoginCredentials } from '../../domain/LoginCredentials';
import { LoginRepository } from '../../domain/LoginRepository';
import { UserRepository } from '../../../user/domain/exceptions/UserRepository';

export class LoginRepositoryImpl implements LoginRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(credentials: LoginCredentials): Promise<boolean> {
    const user = await this.userRepository.findByEmail(credentials.Email);
    
    if (!user) {
      // Comparar con contraseña vacía para evitar side-channel attacks
      await PasswordHasher.compare(credentials.PasswordHash, '');
      return false;
    }

    return await PasswordHasher.compare(credentials.PasswordHash, user.PasswordHash);
  }

  async generateTokens(Iduser: number, Email: string): Promise<AuthTokens> {
    // Payload basado en VO → extraemos .value
    const payload = {
      Iduser: Iduser,
      Email: Email
    };
    // Obtenemos información y permisos del usuario
    const userPermissions = await this.userRepository.userPermissions(payload.Iduser);
    // Usamos JwtService en lugar de jwt.sign directamente
    const accessToken = JwtService.generateAccessToken(payload);

    return { accessToken, userPermissions };
  }

  async invalidateTokens(refreshToken: string): Promise<void> {
    await this.userRepository.invalidateRefreshToken(refreshToken);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return JwtService.validateAccessToken(token);
    } catch (error: any) {
      throw new Error('Token no válido: ' + error.message);
    }
  }
}
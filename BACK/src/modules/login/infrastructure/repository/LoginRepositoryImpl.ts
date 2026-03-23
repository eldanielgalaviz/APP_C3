
import { UserRepository } from '../../../User/domain/exceptions/UserRepository';
import { PasswordHasher } from '../../../../shared/security/PasswordHasher';
import jwt from 'jsonwebtoken';
import { JwtService } from '../../../../middlewares/JwtService';
import { AuthTokens } from '../../domain/AuthTokens';
import { LoginCredentials } from '../../domain/LoginCredentials';
import { LoginRepository } from '../../domain/LoginRepository';

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

  async generateTokens(Email: string): Promise<AuthTokens> {
    const user = await this.userRepository.findByEmail(Email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    // Payload basado en VO → extraemos .value
    const payload = {
      Iduser: user.Iduser,
      Email: user.Email
    };
    // Obtenemos información y permisos del usuario
    const userPermissions = await this.userRepository.userPermissions(payload.Iduser);
    // Usamos JwtService en lugar de jwt.sign directamente
    const accessToken = JwtService.generateAccessToken(payload);
    const refreshToken = JwtService.generateRefreshToken(payload);
    
    // Guardamos el refresh token en BD
    // await this.userRepository.saveRefreshToken(user.Iduser, refreshToken);

    return { accessToken, refreshToken, userPermissions };
  }

  async invalidateTokens(refreshToken: string): Promise<void> {
    try {
      // Validamos el token antes de invalidarlo
      const decoded = JwtService.validateRefreshToken(refreshToken);
      
      if (!decoded || !decoded.Iduser) {
        throw new Error('Token inválido o sin ID de usuario');
      }

      // Eliminamos de la base de datos
      await this.userRepository.invalidateRefreshToken(refreshToken);
    } catch (error) {
      console.error('Error al invalidar token:', error);
      throw new Error('No se pudo invalidar el token');
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      // Validamos el access token
      return JwtService.validateAccessToken(token);
    } catch (error: any) {
      throw new Error('Token no válido: ' + error.message);
    }
  }
}
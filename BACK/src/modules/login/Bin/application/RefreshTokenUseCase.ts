import { AuthTokens } from "../../domain/AuthTokens";
import { LoginRepository } from "../../domain/LoginRepository";

export class RefreshTokenUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(refreshToken: string): Promise<AuthTokens> {
    try {
      // Valida el token (esto debe devolver el payload)
      const decoded = await this.loginRepository.validateToken(refreshToken);

      // Genera nuevos tokens
      return await this.loginRepository.generateTokens(decoded.Email);

    } catch (error) {
      throw new Error('Refresh token inválido');
    }
  }

  async invalidateToken(refreshToken: string): Promise<void> {
    try {
      // Opcional: validar antes de invalidar
      await this.loginRepository.validateToken(refreshToken);
      await this.loginRepository.invalidateTokens(refreshToken);
    } catch (error) {
      // Aunque falle, eliminamos la cookie
      console.warn('Refresh token no válido al invalidar:', error);
    }
  }
}
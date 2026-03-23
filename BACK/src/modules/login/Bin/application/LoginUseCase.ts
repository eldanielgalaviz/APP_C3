
import { AuthTokens } from '../../domain/AuthTokens';
import { LoginCredentials } from '../../domain/LoginCredentials';
import { LoginRepository } from '../../domain/LoginRepository';


export class LoginUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthTokens> {
    const isValid = await this.loginRepository.validateUser(credentials);

    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    return await this.loginRepository.generateTokens(credentials.Email);
  }
}

import { PasswordHasher } from '../../../shared/security/PasswordHasher';
import { UserRepository } from '../../user/domain/exceptions/UserRepository';
import { AuthTokens } from '../domain/AuthTokens';
import { LoginCredentials } from '../domain/LoginCredentials';
import { LoginRepository } from '../domain/LoginRepository';


export class LoginUseCase {
  constructor(private readonly loginRepository: LoginRepository, private readonly userRepository: UserRepository) {}
  
  async execute(credentials: LoginCredentials): Promise<AuthTokens> {
    const user = await this.userRepository.findByEmail(credentials.Email);  
    if (!user) {
      throw new Error('User not found');
    }
    
    const isValid = await PasswordHasher.compare(credentials.PasswordHash, user.PasswordHash);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return await this.loginRepository.generateTokens(user.Iduser, credentials.Email);
  }
}
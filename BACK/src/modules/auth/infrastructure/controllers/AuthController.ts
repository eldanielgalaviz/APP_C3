import { Request, Response } from 'express';
import { LoginCredentials } from '../../domain/LoginCredentials';
import { AuthTokens } from '../../domain/AuthTokens';
import { ServiceContainer } from '../../../../bootstrap/containers/ServiceContainer';
import { EncryptionService } from '../../../../shared/security/EncryptionService';

export class AuthController {
  constructor() {}

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userData } = req.body;

      if (!userData) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request format - userData is required'
        });
      }

      let credentials: LoginCredentials;
      try {
        const decryptedData = EncryptionService.decryptObject(userData);
        
        credentials = {
          Email: decryptedData.Email,
          PasswordHash: decryptedData.password 
        };
      } catch (error) {
        console.error('Decryption error:', error);
        return res.status(400).json({
          success: false,
          message: 'Invalid encrypted data'
        });
      }

      if (!credentials.Email || !credentials.PasswordHash) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      const tokens: AuthTokens = await ServiceContainer.auth.loginUseCase.execute(credentials);


      const userPermissions =  tokens.userPermissions[0];

      if(!userPermissions.user_context.user){
        return res.status(403).json({
          valido: 0,
          message: 'User is not enabled'
        });
      }

      // res.cookie('refreshToken', tokens.refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      //   path: '/api/auth'
      // });

      return res.status(200).json({
        token: tokens.accessToken,
        result: userPermissions,
        message: 'Login successful',
        valido: 1 
      });

    } catch (error: any) {
      console.error('Error en login:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        valido: 0
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (refreshToken) {
        await ServiceContainer.auth.refreshTokenUseCase.invalidateToken(refreshToken);
      }

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth'
      });

      return res.status(200).json({
        success: true,
        message: 'Sesión cerrada correctamente'
      });

    } catch (error: any) {
      console.error('Error en logout:', error.message);
      return res.status(500).json({
        success: false,
        message: 'No se pudo cerrar la sesión'
      });
    }
  };

  refresh = async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'No hay refreshToken'
        });
      }

      const newTokens: AuthTokens = await ServiceContainer.auth.refreshTokenUseCase.execute(refreshToken);

      return res.status(200).json({
        success: true,
        accessToken: newTokens.accessToken,
        message: 'Token renovado'
      });

    } catch (error: any) {
      console.error('Error renovando token:', error.message);
      return res.status(403).json({
        success: false,
        message: 'Refresh token inválido o expirado'
      });
    }
  };
}
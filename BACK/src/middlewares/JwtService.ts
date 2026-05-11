// JwtService.ts
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

export class JwtService {
  private static readonly ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.CONFIG_DECRYPTION_KEY || 'access-token-secret';
  private static readonly REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || process.env.CONFIG_DECRYPTION_KEY || 'refresh-token-secret';
  private static readonly ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '1d';
  private static readonly REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

  // Generate an access token with a short expiration time
  static generateAccessToken(payload: string | object | Buffer): string {
    const options: SignOptions = { 
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN as any
    };
    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, options);
  }

  // Generate a refresh token with a longer expiration time
  static generateRefreshToken(payload: string | object | Buffer): string {
    const options: SignOptions = { 
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN as any
    };
    return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, options);
  }

  // Verify an access token
  static verifyAccessToken(token: string): any {
    try {
      const options: VerifyOptions = {};
      return jwt.verify(token, this.ACCESS_TOKEN_SECRET, options);
    } catch (error) {
      return null;
    }
  }

  // Verify a refresh token
  static verifyRefreshToken(token: string): any {
    try {
      const options: VerifyOptions = {};
      return jwt.verify(token, this.REFRESH_TOKEN_SECRET, options);
    } catch (error) {
      return null;
    }
  }
  
  // Validate access token (throws error if invalid)
  static validateAccessToken(token: string): any {
    const options: VerifyOptions = {};
    return jwt.verify(token, this.ACCESS_TOKEN_SECRET, options);
  }
  
  // Validate refresh token (throws error if invalid)
  static validateRefreshToken(token: string): any {
    const options: VerifyOptions = {};
    return jwt.verify(token, this.REFRESH_TOKEN_SECRET, options);
  }
}
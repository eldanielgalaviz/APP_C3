// src/shared/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './JwtService';

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }
    
    const token = authHeader.substring(7);
    const payload = JwtService.verifyAccessToken(token);
    
    if (!payload) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
    
    (req as any).user = payload;
    next();
  }

  static userLogged(req: Request){
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return "Not user logged";
    } else {
        const payload = JwtService.verifyAccessToken(token);
        const userId = payload.Iduser;
        return userId;
    }
  }
}
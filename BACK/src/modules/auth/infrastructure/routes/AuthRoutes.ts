import { asyncWrapper } from '../../../../shared/middleware/asyncHandler';
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import rateLimit from 'express-rate-limit';

export class AuthRoutes {
  static register(router: Router): void {
    const authRouter = Router();
    router.use('/auth', authRouter);
    const loginLimiter = rateLimit({ windowMs: 15*60*1000, max: 10, message: 'Too many attempts' });
    
    const controller = new AuthController();

    authRouter.post('/login', asyncWrapper(controller.login), loginLimiter);
    authRouter.post('/logout', asyncWrapper(controller.logout));
    authRouter.get('/refresh-token', asyncWrapper(controller.refresh));
  }
}
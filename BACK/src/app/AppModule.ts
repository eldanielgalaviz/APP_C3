// src/app/AppModule.ts
import { Application, Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt';
import { UserRoutes } from '../modules/User/infrastructure/routes/UserRoutes';
import { AuthRoutes } from '../modules/login/infrastructure/routes/AuthRoutes';
import { OriginationRoutes } from '../modules/Origination/infraestructure/routes/OriginationRoutes';
import { OriginationCatalogsRoutes } from '../modules/Origination/infraestructure/routes/OriginationCatalogsRoutes';
import { UserCatalogRoutes } from '../modules/User/infrastructure/routes/UserCatalogsRoutes';
import { ToolRoutes } from '../modules/Tools/infraestructure/routes/toolRoutes';
import { ImplementationRoutes } from '../modules/Implementation/infraestructure/routes/ImplementationRoutes';

export class AppModule {
  constructor(private readonly app: Application) {
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    // Habilitar parseo de JSON
   // this.app.use(express.json());
  }

  private configureRoutes(): void {
    // Crear un router principal
    const router = Router();

    // Montar todas las rutas bajo /api
    this.app.use('/api', router);


    // Registrar módulos de rutas
    AuthRoutes.register(router);   // Rutas: /auth/login, /auth/logout, etc.
    UserRoutes.register(router);
    ToolRoutes.register(router);


    UserCatalogRoutes.register(router);
    OriginationRoutes.register(router);
    OriginationCatalogsRoutes.register(router);

    /** Implementation */
    ImplementationRoutes.register(router);

    // Ruta protegida de ejemplo
    this.app.get('/api/profile', validarJWT, (req, res) => {
      res.json({ 
        message: 'Perfil del usuario', 
        user: (req as any).user 
      });
    });
  }
}
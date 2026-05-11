import { Router } from 'express';
import { MainMenusRoutes } from './Menus/MainMenusRoutes';
import { SubMenuRoutes } from './Menus/SubMenuRoutes';
import { ModuleRoutes } from './Menus/ModuleRoutes';
import { RoleRoutes } from './Roles/RoleRoutes';
import { UserRoleRoutes } from './Roles/UserRoleRoutes';
import { RolePermissionRoutes } from './Roles/RolePermissionRoutes';
import { UserModuleRoutes } from './Roles/UserModuleRoutes';
export class ToolRoutes {
  static register(router: Router): void {
    const toolsRouter = Router();

    router.use('/tools', toolsRouter);

    MainMenusRoutes.register(toolsRouter);
    SubMenuRoutes.register(toolsRouter);
    ModuleRoutes.register(toolsRouter);
    RoleRoutes.register(toolsRouter);
    UserRoleRoutes.register(toolsRouter);
    RolePermissionRoutes.register(toolsRouter);
    UserModuleRoutes.register(toolsRouter);
  }
}
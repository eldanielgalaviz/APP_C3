import { get } from "http";
import { getMainMenu } from "../../../modules/Tools/Bin/application/get/Menus/getMainMenu";
import { getModule } from "../../../modules/Tools/Bin/application/get/Menus/getModule";
import { getSubMenu } from "../../../modules/Tools/Bin/application/get/Menus/getSubMenu";
import { getRole } from "../../../modules/Tools/Bin/application/get/Roles/getRole";
import { getUserRole } from "../../../modules/Tools/Bin/application/get/Roles/getUserRole";
import { setMainMenu } from "../../../modules/Tools/Bin/application/set/Menus/setMainMenu";
import { setModule } from "../../../modules/Tools/Bin/application/set/Menus/setModule";
import { setSubMenu } from "../../../modules/Tools/Bin/application/set/Menus/setSubMenu";
import { setRole } from "../../../modules/Tools/Bin/application/set/Roles/setRole";
import { setUserRole } from "../../../modules/Tools/Bin/application/set/Roles/setUserRole";
import { MainMenuRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Menus/ToolsMainMenuRepositoryImpl";
import { ModuleRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Menus/ToolsModuleRepositoryImpl";
import { SubMenuRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Menus/ToolsSubMenuRepositoryImpl";
import { RoleRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Roles/ToolRoleRepositoryImpl";
import { UserRoleRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Roles/ToolUserRoleRepositoryImpl";
import { setRolePermission } from "../../../modules/Tools/Bin/application/set/Roles/setRolePermission";
import { getRolePermission } from "../../../modules/Tools/Bin/application/get/Roles/getRolePermission";
import { RolePermissionRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Roles/ToolRolePermissionRepositoryImpl";
import { getUserModule } from "../../../modules/Tools/Bin/application/get/Roles/getUserModule";
import { UserModuleRepositoryImpl } from "../../../modules/Tools/infraestructure/repository/Roles/ToolUserModuleRepositoryImpl";
import { setUserModule } from "../../../modules/Tools/Bin/application/set/Roles/setUserModule";

/** MENUS */
const mainMenuRepository = new MainMenuRepositoryImpl();
const subMenuRepository = new SubMenuRepositoryImpl();
const moduleRepository = new ModuleRepositoryImpl();

/** ROLES */
const rolesRepository = new RoleRepositoryImpl();
const userRoleRepository = new UserRoleRepositoryImpl();
const rolePermissionRepository = new RolePermissionRepositoryImpl();
const userModuleRepository = new UserModuleRepositoryImpl();

export { 
        mainMenuRepository,
        subMenuRepository,
        moduleRepository,
    };

export const toolsContainer = {
    Menus: {
        getMainMenu: new getMainMenu(mainMenuRepository),
        setMainMenu: new setMainMenu(mainMenuRepository),

        getSubMenu: new getSubMenu(subMenuRepository),
        setSubMenu: new setSubMenu(subMenuRepository),

        getModule: new getModule(moduleRepository),
        setModule: new setModule(moduleRepository),
    },
    
    Roles: {
        getRole: new getRole(rolesRepository),
        setRole: new setRole(rolesRepository),

        getUserRole: new getUserRole(userRoleRepository),
        setUserRole: new setUserRole(userRoleRepository),

        getRolePermission: new getRolePermission(rolePermissionRepository),
        setRolePermission: new setRolePermission(rolePermissionRepository),

        getUserModule: new getUserModule(userModuleRepository),
        setUserModule: new setUserModule(userModuleRepository),
    }
};
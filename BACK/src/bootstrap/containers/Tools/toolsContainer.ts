import { get } from "http";
import { getMainMenu } from "../../../modules/tools/application/get/Menus/getMainMenu";
import { getModule } from "../../../modules/tools/application/get/Menus/getModule";
import { getSubMenu } from "../../../modules/tools/application/get/Menus/getSubMenu";
import { getRole } from "../../../modules/tools/application/get/Roles/getRole";
import { getUserRole } from "../../../modules/tools/application/get/Roles/getUserRole";
import { setMainMenu } from "../../../modules/tools/application/set/Menus/setMainMenu";
import { setModule } from "../../../modules/tools/application/set/Menus/setModule";
import { setSubMenu } from "../../../modules/tools/application/set/Menus/setSubMenu";
import { setRole } from "../../../modules/tools/application/set/Roles/setRole";
import { setUserRole } from "../../../modules/tools/application/set/Roles/setUserRole";
import { MainMenuRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Menus/ToolsMainMenuRepositoryImpl";
import { ModuleRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Menus/ToolsModuleRepositoryImpl";
import { SubMenuRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Menus/ToolsSubMenuRepositoryImpl";
import { RoleRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Roles/ToolRoleRepositoryImpl";
import { UserRoleRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Roles/ToolUserRoleRepositoryImpl";
import { setRolePermission } from "../../../modules/tools/application/set/Roles/setRolePermission";
import { getRolePermission } from "../../../modules/tools/application/get/Roles/getRolePermission";
import { RolePermissionRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Roles/ToolRolePermissionRepositoryImpl";
import { getUserModule } from "../../../modules/tools/application/get/Roles/getUserModule";
import { UserModuleRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Roles/ToolUserModuleRepositoryImpl";
import { setUserModule } from "../../../modules/tools/application/set/Roles/setUserModule";
import { getPermissionUser } from "../../../modules/tools/application/get/Roles/getPermissionUser";
import { setPermissionUser } from "../../../modules/tools/application/set/Roles/setPermissionUser";
import { PermissionUserRepositoryImpl } from "../../../modules/tools/infraestructure/repository/Roles/ToolPermissionUserRepositoryImpl";

/** MENUS */
const mainMenuRepository = new MainMenuRepositoryImpl();
const subMenuRepository = new SubMenuRepositoryImpl();
const moduleRepository = new ModuleRepositoryImpl();

/** ROLES */
const rolesRepository = new RoleRepositoryImpl();
const userRoleRepository = new UserRoleRepositoryImpl();
const rolePermissionRepository = new RolePermissionRepositoryImpl();
const userModuleRepository = new UserModuleRepositoryImpl();
const permissionUserRepository = new PermissionUserRepositoryImpl();

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

        getPermissionUser: new getPermissionUser(permissionUserRepository),
        setPermissionUser: new setPermissionUser(permissionUserRepository),
    }
};
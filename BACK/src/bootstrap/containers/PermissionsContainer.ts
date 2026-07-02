import { PermissionsRepositorySub } from "../../modules/permissions/infraestructure/repositories/PermissionsRepositorySub";
import { GetPermissions } from "../../modules/permissions/application/get/GetPermissions";

const permissionsModules = new PermissionsRepositorySub();

export const PermissionsContainer = {

    permissionsContainerType: {
            GetPermissions: new GetPermissions(permissionsModules)
}

}
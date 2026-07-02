import { PermissionsRepository } from '../../domain/Repositories/PermissionsRepository';
import { executeStoredProcedure } from '../../../../shared/db/CallStoredProcedures/CallStoredProcedures';

export class PermissionsRepositorySub implements PermissionsRepository {
  
    async getPermissionsRepository(Idpermissionuser: number): Promise<any> {
        const result = await executeStoredProcedure('sp_get_submenu_permissions_by_Id', [Idpermissionuser]);
        return result[0];
      }

}
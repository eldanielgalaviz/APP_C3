import { PermissionsRequest } from '../Permissions';

export interface PermissionsRepository {
 getPermissionsRepository(Idpermissionuser: number):Promise<PermissionsRequest[]>;
}

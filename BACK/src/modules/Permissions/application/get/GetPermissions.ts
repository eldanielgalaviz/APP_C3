import { PermissionsRepository } from '../../domain/Repositories/PermissionsRepository';


export class GetPermissions {
  constructor(private repository: PermissionsRepository) {}  
    async run(Idpermissionuser: number): Promise<any> {
    return this.repository.getPermissionsRepository(Idpermissionuser);
    }
}


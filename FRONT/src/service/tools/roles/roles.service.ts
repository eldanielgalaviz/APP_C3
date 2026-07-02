import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { UtilApiService } from '../../UtilApi.service';
import { Respuesta } from '../../../app/interfaces/apiResponse.interface';
import { SetRolesPayload, SetUserRolePayload, SetPermissionUserPayload, SetUserModulePayload } from '../../../app/interfaces/tools/roles/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}

  // =================== ROLES ===================

    getRoles(token: string): Observable<Respuesta> {
        return this._apiService.sendGetRequest(this.ApiUrl + 'tools/role/getRole', token);
    }

    setRoles(data: SetRolesPayload, token: string): Observable<Respuesta> {
        return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/rolepermission/setRolePermission', token);
    }

  // =================== USER - ROLES ===================
    getUserRoles(token: string): Observable<Respuesta> {
      return this._apiService.sendGetRequest(this.ApiUrl + 'tools/userrole/getUserRole', token);
    }

    setUserRoles(data: SetUserRolePayload, token: string): Observable<Respuesta> {
      return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/userrole/setUserRole', token);
    }

    getUserModuleRol(token: string): Observable<Respuesta> {
      return this._apiService.sendGetRequest(this.ApiUrl + 'tools/usermodule/getUserModule', token);
    }

    setUserModule(data: SetUserModulePayload, token: string): Observable<Respuesta> {
      return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/usermodule/setUserModule', token);
    }
    
  // =================== USER -  MODULES ===================

    getUsers(token: string): Observable<Respuesta> {
        return this._apiService.sendGetRequest(this.ApiUrl + 'users/getUsers', token);
    }
    
    // =================== PERMISSIONS USER ===================
    getPermissionsUser(token: string): Observable<Respuesta> {
      return this._apiService.sendGetRequest(this.ApiUrl + 'tools/permissionuser/getPermissionUser', token);
    }

    setPermissionsUser(data: SetPermissionUserPayload, token: string): Observable<Respuesta> {
      return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/permissionuser/setPermissionUser', token);
    }
}
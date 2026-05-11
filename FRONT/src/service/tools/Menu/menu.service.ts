import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { UtilApiService } from '../../UtilApi.service';
import { SetModulePayload, SetMainMenuPayload, SetSubMenuPayload } from '../../../app/interfaces/tools/menu/menu.interface';
import { Respuesta } from '../../../app/interfaces/apiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class Menuservice {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}

  // =================== MODULES ===================

  getModules(token: string): Observable<Respuesta> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'tools/module/getModule', token);
  }

  setModules(data: SetModulePayload, token: string): Observable<Respuesta> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/module/setModule', token);
  }

  // =================== MAIN MENU ===================

  getMainMenu(token: string): Observable<Respuesta> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'tools/mainMenu/getMainMenu', token);
  }

  setMainMenu(data: SetMainMenuPayload, token: string): Observable<Respuesta> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/mainMenu/setMainMenu', token);
  }

  // =================== SUB MENU ===================

  getSubMenu(token: string): Observable<Respuesta> {
    return this._apiService.sendGetRequest(this.ApiUrl + 'tools/subMenu/getSubMenu', token);
  }

  setSubMenu(data: SetSubMenuPayload, token: string): Observable<Respuesta> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'tools/subMenu/setSubMenu', token);
  }
}
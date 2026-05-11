import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { UtilApiService } from '../../../UtilApi.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanTeamCatalogService {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}

  getProjectManagers(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `Implementation/plan-team/getProjectManagers`, token);
  }
  
  getSmes(token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `Implementation/plan-team/getSmes`, token);
  }
}

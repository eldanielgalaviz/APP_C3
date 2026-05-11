import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { UtilApiService } from '../../UtilApi.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanTeamService {

    ApiUrl: string = environment.url + 'api/';
  
    constructor(private _apiService: UtilApiService) {}

    getPlanTeam(id: number, token: string): Observable<any> {
      return this._apiService.sendGetRequest(this.ApiUrl + `Implementation/plan-team/getPlanTeam/${id}`, token);
    }
  
    setPlanTeam(data: any, token: string): Observable<any> {
      return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'Implementation/plan-team/setPlanTeam', token);
    }

    getSmeByPlanTeam(id: number, token: string): Observable<any> {
      return this._apiService.sendGetRequest(this.ApiUrl + `Implementation/plan-team/getSmeByPlanTeam/${id}`, token);
    }
}

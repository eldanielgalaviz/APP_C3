import { Injectable } from '@angular/core';
import { UtilApiService } from '../UtilApi.service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectApproval {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}
  
  // =================== PROJECT APPROVAL ===================

  getProjectApproval(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getProjectApproval/${id}`, token);
  }

  setProjectApproval(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setProjectApproval', token);
  }

}
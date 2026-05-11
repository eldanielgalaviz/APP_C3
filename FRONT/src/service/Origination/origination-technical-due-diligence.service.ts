import { Injectable } from '@angular/core';
import { UtilApiService } from '../UtilApi.service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TechnicalDueDiligence {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}
  
  // =================== Technical DUE DILIGENCE ===================

  getCbaData(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getCbaImport/${id}`, token);
  }

  setCBAimport(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setCBAimport', token);
  }

}
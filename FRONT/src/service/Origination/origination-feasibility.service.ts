import { Injectable } from '@angular/core';
import { UtilApiService } from '../UtilApi.service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Origination {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}


  getOrigination(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getOrigination/${id}`, token);
  }

  setOrigination(data: any, namedFiles: { key: string, file: File }[], token: string): Observable<any> {
    return this._apiService.sendPostTokenRequestWithNamedFiles(data, namedFiles, this.ApiUrl + 'origination/setOrigination', token);
  }

  // =================== TEAM AND PLANS ===================
  getTeamAndPlans(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getTeamandplans/${id}`, token);
  }

  setTeamAndPlans(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setTeamandplans', token);
  }

  // =================== PRE PIN ASSUMPTIONS ===================
  getPrePinAssumptions(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getPrePinAssumptions/${id}`, token);
  }

  setPrePinOrigination(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setPrePinOrigination', token);
  }

  setPrePinMrv(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setPrePinMrv', token);
  }

  setPrePinSafeguards(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setPrePinSafeguards', token);
  }
  // =================== PROJECT AREAS ===================
  getspProjectAreas(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getProjectAreas/${id}`, token);
  }

  setProjectAreas(data: any, namedFiles: { key: string, file: File }[], token: string): Observable<any> {
    return this._apiService.sendPostTokenRequestWithNamedFiles(data, namedFiles, this.ApiUrl + 'origination/setProjectAreas', token);
  }

  getFileWithPath(filePath: string, token: string): Observable<Blob> {
    return this._apiService.sendPostBlobRequest(
      this.ApiUrl + 'origination/getFileWithPath',
      { filePath },
      token
    );
  }

    // =================== CDR ESTIMATIONS ===================
  getCDREstimation(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getCDREstimation/${id}`, token);
  }

  setCDREstimation(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setCDREstimation', token);
  }
  
  // =================== ACTIVITY AREAS ===================

  getActivityArea(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getActivityArea/${id}`, token);
  }

  setActivityArea(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setActivityArea', token);
  }

  // =================== PED AREA ===================
  getPed(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getPed/${id}`, token);
  }

  setPedOrigination(data: any, token: string): Observable<any> {
    return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'origination/setPedOrigination', token);
  }

  setPedSig(data: any, namedFiles: { key: string, file: File }[], token: string): Observable<any> {
    return this._apiService.sendPostTokenRequestWithNamedFiles(data, namedFiles, this.ApiUrl + 'origination/setPedSig', token);
  }

  //==================== OVERVIEW =====================
  getOverview(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getOverview/${id}`, token);
  }
}
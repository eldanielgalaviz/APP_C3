import { Injectable } from '@angular/core';
import { UtilApiService } from '../UtilApi.service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LegalKycPayload } from '../../app/interfaces/origination/legal-kyc/legal-kyc.interface';
import { Respuesta } from '../../app/interfaces/apiResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class LegalKyc {

  ApiUrl: string = environment.url + 'api/';

  constructor(private _apiService: UtilApiService) {}
  
  // =================== PROJECT APPROVAL ===================

  getLegalKyc(id: number, token: string): Observable<any> {
    return this._apiService.sendGetRequest(this.ApiUrl + `origination/getLegalKYC/${id}`, token);
  }

  setLegalKyc(data: LegalKycPayload, namedFiles: { key: string, file: File }[], token: string): Observable<Respuesta> {
    return this._apiService.sendPostTokenRequestWithNamedFiles(data, namedFiles, this.ApiUrl + 'origination/setLegalKYC', token);
  }
  getFileWithPath(filePath: string, token: string): Observable<Blob> {
    return this._apiService.sendPostBlobRequest(
      this.ApiUrl + 'origination/getFileWithPath',
      { filePath },
      token
    );
  }
}
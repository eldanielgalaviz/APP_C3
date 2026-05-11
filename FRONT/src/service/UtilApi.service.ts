import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../app/interfaces/apiResponse.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class UtilApiService {

    private readonly _http = inject(HttpClient);
    private readonly _platformId = inject(PLATFORM_ID);

    sendGetRequest<T = Respuesta>(url: string, tokend: string): Observable<T> {
      let token

      if (isPlatformBrowser(this._platformId)) {
        token = localStorage.getItem('token');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this._http.get<T>(url, { headers });
    }

    sendPostTokenRequest<T = any>(body: any, url: string, token: string = ''): Observable<T> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      });

      return this._http.post<T>(url, body, { headers });
    }

    sendPostTokenRequestWithFile(jsonBody: any, file: File, url: string, token: string): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('body', JSON.stringify(jsonBody));
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this._http.post(url, formData, { headers });
    }

    public sendPutRequest(aEnviar: any, url: string, token: string): Observable<any> {
      let json = JSON.stringify(aEnviar);
      let params = "json=" + json;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });;
      return this._http.put(url, json, { headers: headers });
    }

    /** ESTE SE VA A RETIRAR PRONTO */
    public sendGetSinToken( url: string ): Observable<any> {
      const headers = new HttpHeaders({
          'Authorization': `Bearer`
        });
      return this._http.get<any>(url, { headers: headers });
  } 

  sendPostTokenRequestWithMultipleFiles(jsonBody: any, files: File[], url: string, token: string): Observable<any> {
       const formData: FormData = new FormData();
        
      files.forEach((file) => {
          formData.append('files', file);  
      });
        
      formData.append('data', JSON.stringify(jsonBody));  

      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}` 
      });

      return this._http.post(url, formData, { headers });
  }

  sendPostTokenRequestWithNamedFiles(jsonBody: any, namedFiles: { key: string, file: File }[], url: string, token: string): Observable<any> {
    const formData: FormData = new FormData();

    namedFiles.forEach(({ key, file }) => {
      formData.append(key, file);
    });

    formData.append('data', JSON.stringify(jsonBody));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.post(url, formData, { headers });
  }

  sendPostBlobRequest(url: string, body: any, token: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this._http.post(url, body, { headers, responseType: 'blob' });
  }
}

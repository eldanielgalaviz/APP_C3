import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable, of } from 'rxjs';
import { UtilApiService } from '../../../../service/UtilApi.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private config = environment.url
  private apiUrl: string = this.config +'api/auth/login';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,  private _apiService : UtilApiService) {}

  iniciarSesion(body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, body, this.httpOptions);
  }

  registrarUsuario(dataRgister: any): Observable<any> {
    return this.http.post<any>(this.config + 'register', dataRgister, this.httpOptions);
  }
  
  obtenerToken(): Observable<string> {
    const token = sessionStorage.getItem('access');
    return of(token || '');
  }

  getUsers(token: string){
    return this._apiService.sendGetRequest(this.config + `getUsers`, token);
  }

  setUsers(data: any, token: string = ''): Observable<any[]>{
    const url = this.config + "setUsers";
    return this._apiService.sendPostTokenRequest(data, url, token);
  }

  getCtPositions(token: string){
    return this._apiService.sendGetRequest(this.config + `getCtPositions`, token);
  }
}

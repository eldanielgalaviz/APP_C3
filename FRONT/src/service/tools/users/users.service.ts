import { Injectable } from '@angular/core';
import { UtilApiService } from '../../UtilApi.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class usersService {

    ApiUrl: string = environment.url + 'api/';

    constructor(private _apiService: UtilApiService) { }

    getUsers(token: string): Observable<any> {
        return this._apiService.sendGetRequest(this.ApiUrl + `users/getUsers`, token);
    }

    setUsers(data: any, token: string): Observable<any> {
        return this._apiService.sendPostTokenRequest(data, this.ApiUrl + 'users/setUsers', token);
    }
}
import { Injectable } from '@angular/core';
import { UtilApiService } from '../../UtilApi.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class usersCatalogsService {

    ApiUrl: string = environment.url + 'api/';

    constructor(private _apiService: UtilApiService) { }

    getPositions(token: string): Observable<any> {
        return this._apiService.sendGetRequest(this.ApiUrl + `users/catalogs/getPositions`, token);
    }

    getDepartments(token: string): Observable<any> {
        return this._apiService.sendGetRequest(this.ApiUrl + `users/catalogs/getDepartments`, token);
    }

}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { ProfileImageResponse } from '../../../app/interfaces/auth/ProfileImage.interface';

@Injectable({ providedIn: 'root' })
export class ProfileImageService {
  private readonly _http = inject(HttpClient);
  private readonly ApiUrl = environment.url + 'api/';

  getUserProfileImage(token: string): Observable<ProfileImageResponse> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this._http.get<ProfileImageResponse>(
      this.ApiUrl + 'users/getUserProfileImage',
      { headers }
    );
  }

    setUserProfileImage(profileImage: File, token: string): Observable<ProfileImageResponse> {
    const formData = new FormData();
    formData.append('profileImage', profileImage); 
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this._http.post<ProfileImageResponse>(
        this.ApiUrl + 'users/setUserProfileImage',
        formData,
        { headers }
    );
    }
}
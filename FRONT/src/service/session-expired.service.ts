import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionExpiredService {
  private _trigger$ = new Subject<void>();
  readonly trigger$  = this._trigger$.asObservable();

  notify(): void {
    this._trigger$.next();
  }
}
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { stat } from 'src/app/model/stat';
import { statDAO } from '../interface/statDAO';

export const STAT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class StatServiceService implements statDAO {

  constructor(@Inject(STAT_URL_TOKEN) private baseUrl: any, private http: HttpClient) { }
  
  getOverallStat(): Observable<stat> {
    return this.http.get<stat>(this.baseUrl);
  }
}

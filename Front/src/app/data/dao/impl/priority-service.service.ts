import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/model/priority';
import { priorityDAO } from '../interface/priorityDAO';
import { PrioritySearchValues } from '../search/SearchObjects';
import { CommonServiceService } from './common-service.service';

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class PriorityServiceService extends CommonServiceService<Priority> implements priorityDAO{

  constructor(@Inject(PRIORITY_URL_TOKEN) private baseUrl: any, private http: HttpClient) {super(baseUrl, http); }
  findPriorities(taskSearchValues: PrioritySearchValues): Observable<any> {
    return this.http.post<Priority[]>(this.baseUrl + '/search', taskSearchValues);
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/task';
import { taskDAO } from '../interface/taskDAO';
import { TaskSearchValues } from '../search/SearchObjects';
import { CommonServiceService } from './common-service.service';

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService extends CommonServiceService<Task> implements taskDAO {

  constructor(@Inject(TASK_URL_TOKEN) private baseUrl: any, private http: HttpClient) {super(baseUrl, http); }
  findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
    return this.http.post<Task[]>(this.baseUrl + '/search', taskSearchValues);
  }
}

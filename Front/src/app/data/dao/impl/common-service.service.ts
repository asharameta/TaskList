import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class CommonServiceService<T>{

  private readonly url: string;


  constructor(url: string, private httpClient: HttpClient) { 
    this.url=url;
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url+'/id/'+id);
  }
  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url+'/delete/'+id);
  }
  update(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url+'/update', t)
  }
  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.update+'/all');
  }
}

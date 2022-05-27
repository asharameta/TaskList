import { Observable } from "rxjs";

export interface commonDAO<T>{

add(obj: T): Observable<T>;

get(id: number):Observable<T>;

delete(id: number):Observable<T>;

update(obj: T):Observable<T>;

getAll(): Observable<T[]>;


}
import { Observable } from "rxjs";

export interface commonDAO<T>{

add(obj: T): Observable<T>;

findById(id: number):Observable<T>;

delete(id: number):Observable<T>;

update(obj: T):Observable<T>;

findAll(): Observable<T[]>;


}
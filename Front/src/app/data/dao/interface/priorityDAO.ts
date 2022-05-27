import { Observable } from "rxjs";
import { Priority } from "src/app/model/priority";
import { PrioritySearchValues } from "../search/SearchObjects";
import { commonDAO } from "./commonDAO";

export interface priorityDAO extends commonDAO<Priority>{
    findPriorities(prioritySearchValues: PrioritySearchValues): Observable<any>;
}
import { Observable } from "rxjs";
import { Category } from "src/app/model/category";
import { Priority } from "src/app/model/priority";
import { Tsk } from "src/app/model/tsk";
import { TaskSearchValues } from "../search/SearchObjects";
import { commonDAO } from "./commonDAO";

export interface taskDAO extends commonDAO<Tsk>{

    findTasks(taskSearchValues: TaskSearchValues): Observable<any>;

}
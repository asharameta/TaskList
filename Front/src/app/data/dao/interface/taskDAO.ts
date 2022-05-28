import { Observable } from "rxjs";
import { Category } from "src/app/model/category";
import { Priority } from "src/app/model/priority";
import { Task } from "src/app/model/task";
import { TaskSearchValues } from "../search/SearchObjects";
import { commonDAO } from "./commonDAO";

export interface taskDAO extends commonDAO<Task>{

    findTasks(taskSearchValues: TaskSearchValues): Observable<any>;

}
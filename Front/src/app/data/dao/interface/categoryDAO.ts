import { Observable } from "rxjs";
import { Category } from "src/app/model/category";
import { CategorySearchValues } from "../search/SearchObjects";
import { commonDAO } from "./commonDAO";

export interface categoryDAO extends commonDAO<Category>{

    findCategories(categorySearchValues: CategorySearchValues): Observable<any>;

}
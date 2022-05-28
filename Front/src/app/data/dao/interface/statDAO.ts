import { commonDAO } from "./commonDAO";
import { stat } from "src/app/model/stat";
import { Observable } from "rxjs";

export interface statDAO {

    getOverallStat(): Observable<stat>;
}
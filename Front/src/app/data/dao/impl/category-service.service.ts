import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Category } from 'src/app/model/category';
import { categoryDAO } from '../interface/categoryDAO';
import { CategorySearchValues } from '../search/SearchObjects';
import { CommonServiceService } from './common-service.service';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService extends CommonServiceService<Category> implements categoryDAO {

  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl: any, private http: HttpClient) {
    super(baseUrl, http);
   }


  findCategories(categorySearchValues: CategorySearchValues) {
    return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}


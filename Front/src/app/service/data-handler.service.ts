import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Category } from '../model/category';
import { Tsk } from '../model/task';
import { Priority } from '../model/priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new taskDAOArray();
  private categoryDAOArray = new categoryDAOArray();
  private priorityDAOArray = new priorityDAOArray();

  constructor() { }

  //Tasks
  getAllTasks(): Observable<Tsk[]>{
    return this.taskDaoArray.getAll();
  }

  updateTask(task: Tsk): Observable<Tsk | undefined>{
    return this.taskDaoArray.update(task);
  }

  deleteTask(id: number): Observable<Tsk>{
    return this.taskDaoArray.delete(id);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Tsk[]>{
    return this.taskDaoArray.search(category, searchText, status,priority);
  }

  addTask(task: Tsk): Observable<Tsk>{
    return this.taskDaoArray.add(task);
  }



//Category
  getAllCategories(): Observable<Category[]>{
    return this.categoryDAOArray.getAll();
  }

  updateCategory(category: Category): Observable<Category>{
    return this.categoryDAOArray.update(category);
  }

  deleteCategory(id: number): Observable<Category>{
    return this.categoryDAOArray.delete(id);
  }

  searchCategories(title: string){
    return this.categoryDAOArray.search(title);
  }

  addCategory(title: string): Observable<Category>{
    return this.categoryDAOArray.add(new Category(null!, title));
  }

  getTotalCountInCategory(cat: Category): Observable<number>{
    return this.taskDaoArray.getTotalCountInCategory(cat);
  }

  getCompletedCountInCategory(cat: Category): Observable<number>{
    return this.taskDaoArray.getCompletedCountInCategory(cat);
  }

  getUncompletedCountInCategory(cat: Category): Observable<number>{
    return this.taskDaoArray.getUncompletedCountInCategory(cat);
  }

  getUncompletedTotalCount():Observable<number>{
    return this.taskDaoArray.getUncompletedCountInCategory(null!);
  }

//priority
getAllPriorities(): Observable<Priority[]>{
  return this.priorityDAOArray.getAll();
}

addPriority(priority:Priority): Observable<Priority>{
    return this.priorityDAOArray.add(priority);
}

deletePriority(id:number): Observable<Priority>{
    return this.priorityDAOArray.delete(id);
}

updatePriority(priority:Priority): Observable<Priority>{
    return this.priorityDAOArray.update(priority);
}

}

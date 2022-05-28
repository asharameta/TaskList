import { Component, OnInit } from '@angular/core';
import { concatMap, map, zip } from 'rxjs';
import { Category } from './model/category';
import { Priority } from './model/priority';
import { Task } from './model/task';
import { DataHandlerService } from './service/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks!: Task[];
  categories!: Category[];
  priorities!: Priority[];
  title = 'tasklist';

  categoryMap = new Map<Category, number>();

  totalTasksCountInCategory!: number;
  completedCountInCategory!: number;
  uncomplitedCountInCategory!: number;
  uncomplitedTotalTasksInCategory!:number;

  selectedCategory!: Category;

  searchTaskText='';
  showStat=true;

  statusFilter!: boolean;
  priorityFilter!: Priority;
  searchCategoryText!: string;

  constructor(private dataHandler: DataHandlerService){

  }
  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities=>this.priorities=priorities);
    this.dataHandler.getAllCategories().subscribe(categories=>this.categories=categories);

    this.fillCategories();

    this.onSelectCategory(null!);
  }

  onSelectCategory(category: Category){
    this.selectedCategory = category;

    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task){
    this.dataHandler.updateTask(task).subscribe(()=>{
      this.fillCategories();

      this.updateTasksAndStat();
    });
  }

  onDeleteTask(task: Task){

    this.dataHandler.deleteTask(task.id).pipe(
      concatMap(t=>{
        return this.dataHandler.getUncompletedCountInCategory(t.category!).pipe(map(count=>{
          return({t,count});
        }));
      })).subscribe(res=>{
        const t = res.t as Task;

        if(t.category){
        this.categoryMap.set(t.category!, res.count);
        }

        this.updateTasksAndStat()
      });
  }

  onDeleteCategory(category: Category){
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null!;
      this.categoryMap.delete(cat);
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
  });
  }

  onUpdateCategory(category: Category){
    this.dataHandler.updateCategory(category).subscribe(()=>{
      this.onSearchCategory(this.searchCategoryText);
    })
  }

  onSearchTasks(searchString: string){
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: boolean){
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority){
     this.priorityFilter = priority;
     this.updateTasks();
  }

  updateTasks(){
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
      ).subscribe((tasks: Task[])=>{
        this.tasks = tasks;
      });
  }

  onAddTask(task: Task){
    this.dataHandler.addTask(task).pipe(

      concatMap(task=>{
        return this.dataHandler.getUncompletedCountInCategory(task.category!).pipe(map(count=>{
          return ({t: task,count});
        }));
      }
      )).subscribe(res=>{
        const t = res.t as Task;

        if(t.category){
          this.categoryMap.set(t.category, res.count);
        }

        this.updateTasksAndStat();
      });
  }

  onAddCategory(title: string){
    this.dataHandler.addCategory(title).subscribe(() => this.fillCategories());
  }

  fillCategories(){
    if(this.categoryMap){
      this.categoryMap.clear();
    }

    console.log(this.categoryMap);
    console.log("inside fillcat");

    this.categories = this.categories.sort((a,b)=>a.title.localeCompare(b.title));

    this.categories.forEach(cat=>{
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count=>this.categoryMap.set(cat, count));
    })
  }

  onSearchCategory(title: string){
    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe((cat: Category[])=>{
      this.categories=cat;
      this.fillCategories();
    })
  }

  updateTasksAndStat(): void {

    this.updateTasks();

    this.updateStat();
  }

  updateStat(): void {
      zip(
          this.dataHandler.getTotalCountInCategory(this.selectedCategory),
          this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
          this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
          this.dataHandler.getUncompletedTotalCount())

          .subscribe(array => {
              this.totalTasksCountInCategory= array[0];
              this.completedCountInCategory = array[1];
              this.uncomplitedCountInCategory = array[2];
              this.uncomplitedTotalTasksInCategory = array[3];
          });
  }

  toggleStat(showStat: boolean){
    this.showStat=showStat;
  }
}

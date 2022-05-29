import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { CategoryServiceService } from './data/dao/impl/category-service.service';
import { PriorityServiceService } from './data/dao/impl/priority-service.service';
import { StatServiceService } from './data/dao/impl/stat-service.service';
import { TaskServiceService } from './data/dao/impl/task-service.service';
import { CategorySearchValues, TaskSearchValues } from './data/dao/search/SearchObjects';
import { Category } from './model/category';
import { Priority } from './model/priority';
import { stat } from './model/stat';
import { Task } from './model/task';
import { DashboardData } from './object/DashBoardData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  categories!: Category[];
  tasks!: Task[];
  priorities!: Priority[];
  title = 'tasklist';

  uncompletedCountForCategoryAll!:number;
  totalTasksFounded!: number;

  selectedCategory!: Category;

  showStat=true;
  showSearch=true;

  stat!: stat;
  dash: DashboardData = new DashboardData();

  categorySearchValues = new CategorySearchValues();
  taskSearchValues = new TaskSearchValues();

  constructor(private categoryService: CategoryServiceService, private statService: StatServiceService, private priorityService: PriorityServiceService, private taskService: TaskServiceService){
    
    this.statService.getOverallStat().subscribe((result => {
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;


      this.fillAllCategories().subscribe(res => {
          this.categories = res;

          this.selectCategory(this.selectedCategory);

      });


  }));
  }

  
  ngOnInit(): void {

    this.fillAllPriorities();
  }

  selectCategory(category: Category) {

    if (category) {
        this.fillDashData(category.completedCount, category.uncompletedCount);
    } else {
        this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
    }

    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category;

    this.taskSearchValues.categoryId = category ? category.id : null!;

    this.searchTasks(this.taskSearchValues);
  }

  fillDashData(completedCount: number, uncompletedCount: number) {
    this.dash.completedTotal = completedCount;
    this.dash.uncompletedTotal = uncompletedCount;
  }

  onSelectCategory(category: Category){
    this.taskSearchValues.pageNumber = 0;

     this.selectedCategory = category!;

      this.taskSearchValues.categoryId = category ? category.id : null!;

      this.onSearchTasks(this.taskSearchValues);

  }

  searchTasks(searchTaskValues: TaskSearchValues) {
    this.taskSearchValues = searchTaskValues;

    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {
        if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
            this.taskSearchValues.pageNumber = 0;
            this.searchTasks(this.taskSearchValues);
        }

        this.totalTasksFounded = result.totalElements;
        this.tasks = result.content;
    });

}

updateCategoryCounter(category: Category) {

  this.categoryService.findById(category.id).subscribe(cat => { 

      this.categories[this.getCategoryIndex(category)] = cat; 

      this.showCategoryDashboard(cat); 

  });
}

showCategoryDashboard(cat: Category) {
  if (this.selectedCategory && this.selectedCategory.id === cat.id) {
      this.fillDashData(cat.completedCount, cat.uncompletedCount);
  }
}

  onAddTask(task: Task){
    this.taskService.add(task).subscribe(() => {

      if (task.category) {
          this.updateCategoryCounter(task.category); 
      }
      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  updateOverallCounter() {

    this.statService.getOverallStat().subscribe((res => { 
        this.stat = res; 
        this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal; 

        if (!this.selectedCategory) { 
            this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
        }

    }));

}

  onUpdateTask(task: Task){
    this.taskService.update(task).subscribe(() => {

      if (task.oldCategory) { 
          this.updateCategoryCounter(task.oldCategory); 
      }

      if (task.category) {
          this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter(); 

      this.searchTasks(this.taskSearchValues);

  });
  }

  onDeleteTask(task: Task){
    this.taskService.delete(task.id).subscribe(() => {

      if (task.category) {
          this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);

  });

    
  }

  onDeleteCategory(category: Category){
    this.categoryService.delete(category.id).subscribe(cat=>{
      this.selectedCategory = null!;
      this.onSearchCategory(this.categorySearchValues);
      this.onSelectCategory(this.selectedCategory!);
    });
  }

  onUpdateCategory(category: Category){
    this.categoryService.update(category).subscribe(cat=>{
      this.onSearchCategory(this.categorySearchValues);
    });
  }

  onSearchTasks(searchTaskValues: TaskSearchValues){
    this.taskSearchValues = searchTaskValues;

    //this.cookiesUtils.setCookie(this.cookieTaskSearchValues, JSON.stringify(this.taskSearchValues));


    this.taskService.findTasks(this.taskSearchValues).subscribe(res=>{

      if(res.totalPages>0 && this.taskSearchValues.pageNumber>=res.totalPages){
        this.taskSearchValues.pageNumber=0;
        this.onSearchTasks(this.taskSearchValues);
      }

      this.totalTasksFounded=res.totalElements;
      this.tasks = res.content;
    })
    
  }


  onAddCategory(category: Category){
    this.categoryService.add(category).subscribe(cat=>{
      this.onSearchCategory(this.categorySearchValues);
    });
  }

  fillAllPriorities(){
    this.priorityService.findAll().subscribe(res=>{
      this.priorities=res;
    })
  }

  fillAllCategories(){
   return this.categoryService.findAll();
  }

  onSearchCategory(categorySearcheValues: CategorySearchValues){
    this.categoryService.findCategories(categorySearcheValues).subscribe(res=>{
      this.categories=res;
    });
  }

  toggleStat(showStat: boolean){
    this.showStat=showStat;
  }

  toggleSearch(showSearch: boolean){
    this.showSearch = showSearch;
  }

  paging(pageEvent: PageEvent){
    if(this.taskSearchValues.pageSize !== pageEvent.pageSize){
    this.taskSearchValues.pageNumber = 0;
    }
    else{
      this.taskSearchValues.pageNumber=pageEvent.pageIndex;
    }

    this.taskSearchValues.pageSize=pageEvent.pageSize;
    this.taskSearchValues.pageNumber=pageEvent.pageIndex;

    this.onSearchTasks(this.taskSearchValues);
  }

  getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    return this.categories.indexOf(tmpCategory!);
}
}

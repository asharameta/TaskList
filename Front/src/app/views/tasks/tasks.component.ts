import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { MatTableDataSource } from "@angular/material/table";
import{ MatPaginator, PageEvent } from "@angular/material/paginator"
import{ MatSort } from "@angular/material/sort"
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { Category } from 'src/app/model/category';
import { Priority } from 'src/app/model/priority';
import { operType } from 'src/app/dialog/operType';
import { TaskSearchValues } from 'src/app/data/dao/search/SearchObjects';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, { static: false })
  private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private sort!: MatSort;

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  paging = new EventEmitter<PageEvent>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  addTask = new EventEmitter<Task>();

  searchTaskText!: string;
  selectedStatusFilter!: boolean;
  selectedPriorityFilter!: Priority;

  taskSearchValues!: TaskSearchValues;
  
  priorities!: Priority[];
  tasks!: Task[];

  @Input('tasks')
  set setTasks(tasks: Task[]){
    this.tasks=tasks;
    this.assignTableSource();
  }

  @Input('taskSearchValues')
  set setTaskSearchValues(taskSearchValues: TaskSearchValues){
    this.taskSearchValues=taskSearchValues;
  }



  @Input('priorities')
  set setPriorities(priorities: Priority[]){
    this.priorities = priorities;
  }

  @Input()
  selectedCategory!: Category;

  @Input()
  totalTasksFounded!: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.dataHandler.getAllTasks().subscribe(tasks=>this.tasks=tasks);

    this.dataSource = new MatTableDataSource();

    this.onSelectCategory(null!);
  }

  ngAfterViewInit(): void{
    this.addTableObjects();
  }

  getPriorityColor(task: Task){

    if(task.completed){
      return '#f8f9fa';
    }

    if(task.priority && task.priority.color){
      return task.priority.color;
    }

    return '#fff';
  }

  private assignTableSource(){
    if(!this.dataSource){
      return;
    }

    this.dataSource.data = this.tasks;
  }
  private addTableObjects(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditTaskDialog(task: Task){
   
  }

  openDeleteDialog(task: Task){
   
  }

  onToggleStatus(task: Task){
   
  }

  onSelectCategory(category: Category){
    this.selectCategory.emit(category);
  }

  onFilterByTitle(){
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean){
    if(value!== this.selectedStatusFilter){
      this.selectedStatusFilter=value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(value: Priority){
    if(value !== this.selectedPriorityFilter){
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  openAddTaskDialog(){
   
  }

  pageChanged(pageEvent: PageEvent){
    this.paging.emit(pageEvent);
  }
}

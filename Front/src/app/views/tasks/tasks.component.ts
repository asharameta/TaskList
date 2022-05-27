import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Tsk } from 'src/app/model/tsk';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { MatTableDataSource } from "@angular/material/table";
import{ MatPaginator } from "@angular/material/paginator"
import{ MatSort } from "@angular/material/sort"
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { Category } from 'src/app/model/category';
import { Priority } from 'src/app/model/priority';
import { operType } from 'src/app/dialog/operType';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource!: MatTableDataSource<Tsk>;

  @ViewChild(MatPaginator, { static: false })
  private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private sort!: MatSort;

  @Output()
  updateTask = new EventEmitter<Tsk>();

  @Output()
  deleteTask = new EventEmitter<Tsk>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  addTask = new EventEmitter<Tsk>();

  searchTaskText!: string;
  selectedStatusFilter!: boolean;
  selectedPriorityFilter!: Priority;
  
  priorities!: Priority[];
  tasks!: Tsk[];

  @Input('tasks')
  set setTasks(tasks: Tsk[]){
    this.tasks=tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]){
    this.priorities = priorities;
  }

  @Input()
  selectedCategory!: Category;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.dataHandler.getAllTasks().subscribe(tasks=>this.tasks=tasks);

    this.dataSource = new MatTableDataSource();

    this.onSelectCategory(null!);
  }

  ngAfterViewInit(): void{
    this.addTableObjects();
  }

  toggleTastCompleted(task: Tsk){
    task.completed=!task.completed;
  }

  getPriorityColor(task: Tsk){

    if(task.completed){
      return '#f8f9fa';
    }

    if(task.priority && task.priority.color){
      return task.priority.color;
    }

    return '#fff';
  }

  private fillTable(){

    if(!this.dataSource){
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) =>{
      switch(colName){
        case 'priority': {
          return task.priority ? task.priority.id : null as any;
        }
        case 'category': {
          return task.category ? task.category?.title : null as any;
        }
        case 'date': {
          return task.date ? task.date : null as any;
        }
        case 'title': {
          return task.title as any;
        }
      }
      return null as any;
    };
  }
  private addTableObjects(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openEditTaskDialog(task: Tsk){
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, "Editing Task", operType.EDIT], autoFocus: false});

    dialogRef.afterClosed().subscribe(res=>{

      if(res === 'delete'){
        this.deleteTask.emit(task);
        return;
      }

      if(res==='complete'){
        task.completed=true;
        this.updateTask.emit(task);
      }

      if(res==='activate'){
        task.completed=false;
        this.updateTask.emit(task);
        return;
      }

      if(res as Tsk){
        this.updateTask.emit(task);
        return;
      }
    })
  }

  openDeleteDialog(task: Tsk){
    const dialogRef=this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Confirm the action', message: `You really want to delete the task: "${task.title}" ?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Tsk){
    task.completed=!task.completed;
    this.updateTask.emit(task);
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
    const task = new Tsk(null!,'',false,null!,this.selectedCategory);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Adding a task',operType.ADD]});

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.addTask.emit(task);
      }
    });
  }
}

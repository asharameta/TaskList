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
import { DialogAction } from 'src/app/object/DialogResult';

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

  @Output()
  toggleSearch = new EventEmitter<boolean>();

  @Output()
  searchAction = new EventEmitter<TaskSearchValues>();

  searchTaskText!: string;
  selectedStatusFilter!: boolean;
  selectedPriorityFilter!: Priority;

  taskSearchValues!: TaskSearchValues;

  changed=false;

  readonly defaultSortColumn='title';
  readonly defaultSortDirection='asc';

  filterTitle!: string;
  filterCompleted!: number;
  filterPriorityId!: number;
  filterSortColumn!: string;
  filterSortDirection!: string;

  sortIconName!: string;
  readonly iconNameDown = 'arrow_downward';
  readonly iconNameUp = 'arrow_upward';

  readonly colorCompletedTask = '#f8f9fa';
  readonly colorWhite='#fff';
  
  priorities!: Priority[];
  categories!: Category[];
  tasks!: Task[];

  @Input('tasks')
  set setTasks(tasks: Task[]){
    this.tasks=tasks;
    this.assignTableSource();
  }

  @Input('taskSearchValues')
  set setTaskSearchValues(taskSearchValues: TaskSearchValues){
    this.taskSearchValues=taskSearchValues;
    this.initSearchValues();
    this.initSortDirectionIcon();
  }

  @Input('categories')
  set setCategories(categories: Category[]){
    this.categories = categories;
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]){
    this.priorities = priorities;
  }

  @Input()
  selectedCategory!: Category;

  @Input()
  totalTasksFounded!: number;

  @Input()
  showSearch!: boolean;

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

    if (task.completed) {
      return this.colorCompletedTask;
  }

  // вернуть цвет приоритета, если он указан
  if (task.priority && task.priority.color) {
      return task.priority.color;
  }

  return this.colorWhite;
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

  openAddDialog(){
    const task = new Task(null!, '', 0, null!, this.selectedCategory);

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {

            data: [task, 'Adding a task', this.categories, this.priorities]
        });

        dialogRef.afterClosed().subscribe(result => {

            if (!result) {
                return;
            }

            if (result.action === DialogAction.SAVE) {
                this.addTask.emit(task);
            }
        });
  }

  openEditDialog(task: Task){
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Editing a task', this.categories, this.priorities],
      autoFocus: false
  });

  dialogRef.afterClosed().subscribe(result => {


      if (!(result)) {
          return;
      }


      if (result.action === DialogAction.DELETE) {
          this.deleteTask.emit(task);
          return;
      }

      if (result.action === DialogAction.COMPLETE) {
          task.completed = 1;
          this.updateTask.emit(task);
      }


      if (result.action === DialogAction.ACTIVATE) {
          task.completed = 0;
          this.updateTask.emit(task);
          return;
      }

      if (result.action === DialogAction.SAVE) {
          this.updateTask.emit(task);
          return;
      }


  });
   
  }

  openDeleteDialog(task: Task){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Confirm action', message: `You really want to delete the task: "${task.title}"?`},
      autoFocus: false
  });

  dialogRef.afterClosed().subscribe(result => {


      if (!(result)) {
          return;
      }


      if (result.action === DialogAction.OK) {
          this.deleteTask.emit(task);
      }
  });
  }

  onToggleCompleted(task: Task){
    if (task.completed === 0) {
      task.completed = 1;
  } else {
      task.completed = 0;
  }
  this.updateTask.emit(task);
  }

  onToggleSearch(){
    this.toggleSearch.emit(!this.showSearch);
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


  pageChanged(pageEvent: PageEvent){
    this.paging.emit(pageEvent);
  }

  checkFilterChanged(){

    this.changed = false;

    if(this.taskSearchValues.title !== this.filterTitle){
      this.changed = true;
    }

    if(this.taskSearchValues.completed!==this.filterCompleted){
      this.changed = true;
    }

    if(this.taskSearchValues.priorityId!==this.filterPriorityId){
      this.changed = true;
    }

    if(this.taskSearchValues.sortColumn!==this.filterSortColumn){
      this.changed=true;
    }

    if(this.taskSearchValues.sortDirection!==this.filterSortDirection){
      this.changed=true;
    }

    return this.changed;
  }

  initSearchValues(){
    if(!this.taskSearchValues){
      return;
    }

    this.filterTitle = this.taskSearchValues.title;
    this.filterCompleted = this.taskSearchValues.completed;
    this.filterPriorityId = this.taskSearchValues.priorityId;
    this.filterSortColumn = this.taskSearchValues.sortColumn;
    this.filterSortDirection = this.taskSearchValues.sortDirection;
  }

  changedSortDirection(){
    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
  } else {
      this.filterSortDirection = 'asc';
  }

    this.initSortDirectionIcon();
  }

  initSortDirectionIcon(){
    if (this.filterSortDirection === 'desc') {
      this.sortIconName = this.iconNameDown;
  } else {
      this.sortIconName = this.iconNameUp;
  }
  }

  initSearch(){
    this.taskSearchValues.title = this.filterTitle;
    this.taskSearchValues.completed = this.filterCompleted;
    this.taskSearchValues.priorityId = this.filterPriorityId;
    this.taskSearchValues.sortColumn = this.filterSortColumn;
    this.taskSearchValues.sortDirection = this.filterSortDirection;

    this.searchAction.emit(this.taskSearchValues);

    this.changed = false;
  }

  clearSearchValues(){
  this.filterTitle='';
  this.filterCompleted=null!;
  this.filterPriorityId=null!;
  this.filterSortColumn=this.defaultSortColumn;
  this.filterSortDirection=this.defaultSortDirection;

  }
}

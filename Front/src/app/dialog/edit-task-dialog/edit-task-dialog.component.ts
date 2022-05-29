import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { Priority } from 'src/app/model/priority';
import { Task } from 'src/app/model/task';
import { DialogAction, DialogResult } from 'src/app/object/DialogResult';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { operType } from '../operType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, Category[], Priority[]],
    private dialog: MatDialog) { }

    categories!: Category[];
    priorities!: Priority[];

    dialogTitle!: string;
    task!: Task;
    canDelete!: boolean;
    canComplete!: boolean;

    newTitle!: string;
    newCategoryId!: number;
    newPriorityId!: number;
    oldCategoryId!: number;
    newDate!: Date;
    today= new Date();



  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.categories = this.data[2];
    this.priorities = this.data[3];

    if(this.task && this.task.id>0){
      this.canDelete = true;
      this.canComplete = true;
    }

    this.newTitle = this.task.title;

    if(this.task.priority){
      this.newPriorityId = this.task.priority.id;
    }
 
    if(this.task.category){
      this.newCategoryId = this.task.category.id;
      this.oldCategoryId = this.task.category.id;
    }

    if(this.task.date){
      this.newDate = new Date(this.task.date);
    }
  }



  onConfirm(): void{
    this.task.title = this.newTitle;
    this.task.priority = this.findPriorityById(this.newPriorityId);
    this.task.category = this.findCategoryById(this.newCategoryId);
    this.task.oldCategory = this.findCategoryById(this.oldCategoryId);


    if(!this.newDate){
    this.task.date=null!;
    }
    else{
      this.task.date = this.newDate;
    }

    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.task));
  }

  completeTask(){
    this.dialogRef.close(new DialogResult(DialogAction.COMPLETE));
  }

  activateTask(){
    this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
  }

  onCancel(): void{
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  deleteTask(){

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '500px',
      data:{
        dialogTitle: 'Confirm action',
        message: `You really want to delete the task: "${this.task.title}" ?`
      },
      autoFocus: false
      });

      dialogRef.afterClosed().subscribe(res=>{
        if(!res){
          return;
        }


        if(res){
          this.dialogRef.close(new DialogResult(DialogAction.DELETE));
        }
    });
  }

  activate(){
    this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
  }

  findPriorityById(tmpPriorityId: number): Priority{
    return this.priorities.find(t=>t.id === tmpPriorityId)!;
  }

  findCategoryById(tmpCategoryId: number): Category{
    return this.categories.find(t => t.id === tmpCategoryId)!;
  }

  setToday(){
    this.newDate = this.today;
  }

  addDays(days: number){
    this.newDate = new Date();
    this.newDate.setDate(this.today.getDate()+days);
  }

}


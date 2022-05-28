import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { Priority } from 'src/app/model/priority';
import { Task } from 'src/app/model/task';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { operType } from '../operType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, operType],
    private dialog: MatDialog) { }

    categories!: Category[];
    priorities!: Priority[];

    dialogTitle!: string;
    task!: Task;

    tmpTitle!: string;
    tmpCategory!: Category;
    tmpPriority!: Priority;
    tmpDate!: Date;
    operType!: operType;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category!;
    this.tmpPriority = this.task.priority!;
    this.tmpDate = this.task.date!;

    //this.dataHandler.getAllCategories().subscribe(items=>this.categories = items);
    //this.dataHandler.getAllPriorities().subscribe(items=>this.priorities = items);
  }



  onConfirm(): void{
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date=this.tmpDate;

    this.dialogRef.close(this.task);
  }

  completeTask(){
    this.dialogRef.close('complete');
  }

  activateTask(){
    this.dialogRef.close('activate');
  }

  onCancel(): void{
    this.dialogRef.close(null);
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
        if(res){
          this.dialogRef.close('delete');
        }
    });
  }

  canDelete(): boolean{
    return this.operType === operType.EDIT;
  }

  canActivateDesactivate(): boolean{
    return this.operType === operType.EDIT;
  }

}


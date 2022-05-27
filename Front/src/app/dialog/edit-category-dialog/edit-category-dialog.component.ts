import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { operType } from '../operType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, operType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog) { }

    dialogTitle!: string;
    categoryTitle!: string;
    operType!: operType;

  ngOnInit(): void {
    this.categoryTitle=this.data[0];
    this.dialogTitle=this.data[1];
    this.operType =this.data[2];
  }

  onConfirm(){
    this.dialogRef.close(this.categoryTitle);
  }

  onCancel(){
    this.dialogRef.close(false);
  }

  onDelete(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data:{
        dialogTitle: 'Confirm action',
        message: `You really want to delete the category: "${this.categoryTitle}" ?`
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

}

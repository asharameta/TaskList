import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { DialogAction, DialogResult } from 'src/app/object/DialogResult';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { operType } from '../operType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dialog: MatDialog) { }

    dialogTitle!: string;
    category!: Category;
    canDelete =true;

  ngOnInit(): void {
    this.category=this.data[0];
    this.dialogTitle=this.data[1];

    if(this.category && this.category && this.category.id>0){
      this.canDelete=true;
    }
  }

  onConfirm(){
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.category));
  }

  onCancel(){
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  onDelete(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data:{
        dialogTitle: 'Confirm action',
        message: `You really want to delete the category: "${this.category.title}" ?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(res=>{

      if(!res){
        return;
      }

      if(res.action === DialogAction.OK){
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

}

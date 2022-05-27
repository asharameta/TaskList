import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { operType } from '../operType';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  dialogTitle!: string;
  priorityTitle!: string; 
  operType!: operType;

  constructor(
      private   dialogRef: MatDialogRef<EditPriorityDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private  data: [string, string, operType],
      private  dialog: MatDialog
  ) {
  }

  ngOnInit() {
      this.priorityTitle = this.data[0];
      this.dialogTitle = this.data[1];
      this.operType = this.data[2];

  }


  onConfirm(): void {
      this.dialogRef.close(this.priorityTitle);
  }


  onCancel(): void {
      this.dialogRef.close(false);
  }

  // нажали Удалить
  onDelete(): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '500px',
          data: {
              dialogTitle: 'Confirm action',
              message: `You really want to delete the priority: "${this.priorityTitle}"? (the task will be stamped '')`
          },
          autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.dialogRef.close('delete');
          }
      });
  }

  canDelete(): boolean {
      return this.operType == operType.EDIT;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component'
import { EditPriorityDialogComponent } from 'src/app/dialog/edit-priority-dialog/edit-priority-dialog.component'
import { Priority } from 'src/app/model/priority';
import { operType } from '../../dialog/operType'

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';


    @Output()
    deletePriority = new EventEmitter<Priority>();


    @Output()
    updatePriority = new EventEmitter<Priority>();


    @Output()
    addPriority = new EventEmitter<Priority>();


    @Input()
    priorities!: Priority[];

    // -------------------------------------------------------------------------

    constructor(private  dialog: MatDialog
    ) {
    }


    ngOnInit() {
    }

    onDelete(priority: Priority): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Confirm action',
                message: `Do you really want to delete a category: "${priority.title}"? (tasks will be set to 'No Priority')`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deletePriority.emit(priority);
            }
        });
    }

    onAddPriority(): void {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: ['', 'Adding Priority', operType.ADD],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const newPriority = new Priority(null!, result as string, PrioritiesComponent.defaultColor);
                this.addPriority.emit(newPriority);
            }
        });


    }

    onEditPriority(priority: Priority): void {
        const dialogRef = this.dialog.open(EditPriorityDialogComponent, {data: [priority.title, 'Editing Priority', operType.EDIT]});

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') {
                this.deletePriority.emit(priority);
                return;
            }


            if (result) {
                priority.title = result as string;
                this.updatePriority.emit(priority);
                return;
            }
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Priority } from 'src/app/model/priority';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities!: Priority[];

  constructor( private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities=>this.priorities=priorities);
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onAddPriority(priority: Priority){
    this.dataHandler.addPriority(priority).subscribe();
  }

  onDeletePriority(priority: Priority){
    this.dataHandler.deletePriority(priority.id).subscribe();
  }

  onUpdatePriority(priority: Priority){
    this.dataHandler.updatePriority(priority).subscribe();
  }

}

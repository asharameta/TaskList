import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName!: string;

  @Input()
  showStat!:boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onToggleStat(){
    this.toggleStat.emit(!this.showStat);
  }

  showSettings(){
    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      });
  }

}


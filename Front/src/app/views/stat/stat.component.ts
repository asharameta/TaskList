import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  totalTasksInCategory!: number; 

  @Input()
  completedTasksInCategory!: number;

  @Input()
  uncompletedTasksInCategory!: number;

  @Input()
  showStat!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

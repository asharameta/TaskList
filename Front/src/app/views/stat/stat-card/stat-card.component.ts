import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {

  @Input()
  completed = false;

  @Input()
  iconName!: string;

  @Input()
  count1: any;

  @Input()
  countTotal: any;

  @Input()
  title!: string;

  constructor() { }

  ngOnInit(): void {
  }

  

}

import { Component, OnInit, Input } from '@angular/core';
import { DashboardData } from 'src/app/object/DashBoardData';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  dash!: DashboardData;

  @Input()
  showStat!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getTotal(): number{
    if(this.dash){
      return this.dash.completedTotal + this.dash.uncompletedTotal;
    }
    return 0;
  }

  getCompletedCount(){
    if(this.dash){
      return (this.dash.completedTotal);
    }
    return 0;
  }

  getUncompletedCount(){
    if(this.dash){
      return (this.dash.uncompletedTotal);
    }
    return 0;
  }

  getCompletedPercent(){
    if(this.dash){
      return this.dash.completedTotal ? (this.dash.completedTotal / this.getTotal()) : 0;
    }
    return 0;
  }

  getUncompletedPercent(){
    if(this.dash){
      return this.dash.uncompletedTotal ? (this.dash.uncompletedTotal / this.getTotal()) : 0;
    }
    return 0;
  }

}

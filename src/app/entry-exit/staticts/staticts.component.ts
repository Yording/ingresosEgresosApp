import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { EntryExit } from '../entry-exit.model';

@Component({
  selector: 'app-staticts',
  templateUrl: './staticts.component.html',
  styles: []
})
export class StatictsComponent implements OnInit {

  public entries: number = 0
  public exits: number = 0
  public amountEntries: number = 0
  public amountExits: number = 0
  private _sub: Subscription = new Subscription()
  public pieChartLabels:string[] = ['Ingresos', 'Egresos'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this._sub = this.store.select('entryExit').subscribe(
      (entryExit) => {
        this.countEntryExit(entryExit.items)
    })
  }

  countEntryExit(items: EntryExit[]){
    this.entries = 0
    this.exits = 0
    this.amountEntries = 0
    this.amountExits = 0
    items.forEach(item => {
      if(item.type == 'Ingreso'){
        this.amountEntries++;
        this.entries = this.entries + item.amount
      }
      else{
        this.amountExits++;
        this.exits = this.exits + item.amount
      }
    })
    this.pieChartData = [this.entries, this.exits]
  }

}

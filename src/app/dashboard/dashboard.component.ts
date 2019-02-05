import { Component, OnInit } from '@angular/core';
import { EntryExitService } from '../entry-exit/entry-exit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private _entryExitService: EntryExitService) { }

  ngOnInit() {
    this._entryExitService.initEntryExitListener()
  }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { EntryExit } from '../entry-exit.model';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EntryExitService } from '../entry-exit.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  public items: EntryExit[] = []
  private _subItems: Subscription = new Subscription()

  constructor(private store: Store<AppState>, private _entryExitService: EntryExitService) { }

  ngOnInit() {
    this._subItems = this.store.select('entryExit').pipe(
      map(data => data.items),
      filter(items => items.length > 0)
    ).subscribe(
      (items: EntryExit[]) => {
        this.items = items
      }
    )
  }

  ngOnDestroy(){
    this._subItems.unsubscribe()
  }

  deleteItem(uid: string){
    this._entryExitService.deleteEntryExit(uid)
      .then(() => {
        Swal.fire({
          title: 'Elimando',
          text: ` eliminado satisfactoriamente.`,
          type: 'success'
        })
      })
      .catch((err: Error) => {
        Swal.fire({
          title: 'Error al eliminar',
          text: err.message,
          type: 'error'
        })
      })
    console.log(uid)
  }

}

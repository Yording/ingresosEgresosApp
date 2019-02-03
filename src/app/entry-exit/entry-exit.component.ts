import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntryExit } from './entry-exit.model';
import { EntryExitService } from './entry-exit.service';
import Swal from 'sweetalert2'
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromUiActions from '../shared/ui.actions'

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styles: []
})
export class EntryExitComponent implements OnInit, OnDestroy {

  public form: FormGroup
  public type: "Ingreso" | "Egreso" = "Ingreso"
  public loading: boolean = false
  private _subLoading: Subscription = new Subscription()

  constructor(
    private _entryExitService: EntryExitService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this._subLoading = this.store.select('ui')
      .subscribe(
        (ui) => {
        this.loading = ui.isLoading
      })

    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(1))
    })
  }

  ngOnDestroy(){
    this._subLoading.unsubscribe()
  }

  createEntryExit(){
    this.store.dispatch(new fromUiActions.ActiveLoadingAction())
    const entryExit = new EntryExit({ ... this.form.value, type: this.type})
    this._entryExitService.createEntryExit(entryExit)
      .then(
        (data) => {
          this.form.reset({ amount: 0 })
          Swal.fire({
            title: 'Creado',
            text: `${entryExit.type} creado satisfactoriamente.`,
            type: 'success'
          })
          this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
      })
      .catch(
      (err: Error) => {
          Swal.fire({
            title: 'Error al crear ingreso o egreso',
            text: err.message,
            type: 'error'
          })
          this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
      })
    
  }

}

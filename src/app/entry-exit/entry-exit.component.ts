import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntryExit } from './entry-exit.model';
import { EntryExitService } from './entry-exit.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styles: []
})
export class EntryExitComponent implements OnInit {

  public form: FormGroup
  public type: "Ingreso" | "Egreso" = "Ingreso"

  constructor(private _entryExitService: EntryExitService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(1))
    })
  }

  createEntryExit(){
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
      })
      .catch(
      (err: Error) => {
          Swal.fire({
            title: 'Error al crear ingreso o egreso',
            text: err.message,
            type: 'error'
          })
        console.log(err)
      })
    
  }

}

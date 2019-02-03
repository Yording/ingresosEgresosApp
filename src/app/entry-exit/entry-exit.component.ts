import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntryExit } from './entry-exit.model';

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styles: []
})
export class EntryExitComponent implements OnInit {

  public form: FormGroup
  public type: "Ingreso" | "Egreso" = "Ingreso"

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(1))
    })
  }

  createEntryExit(){
    const entryExit = new EntryExit({ ... this.form.value, type: this.type})
  }

}

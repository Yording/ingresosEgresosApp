import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public loading: boolean = false
  private _sub: Subscription = new Subscription()

  constructor(
    private _auth: AuthService,
    private store: Store<AppState>) { }

  ngOnInit() {

    let subLoading = this.store.select('ui').subscribe(
      (ui) => {
      this.loading = ui.isLoading
    })
    this._sub.add(subLoading)
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  signIn(credentials: {email: string, password: string}){
    this._auth.login(credentials)
  }



}

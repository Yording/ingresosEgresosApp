import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  private _sub: Subscription = new Subscription()
  public currentUser: User

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this._sub = this.store.select('auth').pipe(
      filter(auth => auth ? true : false),
      map(auth => auth.user)
    ).subscribe(
      (user: User) => {
        this.currentUser = user
      }
    )
  }

  ngOnDestroy(){
    this._sub.unsubscribe()
  }

}

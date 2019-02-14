import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  private _sub: Subscription = new Subscription()
  public currentUser: User

  constructor(private _auth: AuthService, private store: Store<AppState>) { }

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

  logout(){
    this._auth.logout()
  }

}

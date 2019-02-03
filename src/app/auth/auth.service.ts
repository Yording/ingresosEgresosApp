import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase'
import { map } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromUiActions from '../shared/ui.actions'
import * as fromAuthActions from '../auth/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _subUser: Subscription = new Subscription()

  constructor(
    private _as: AngularFireAuth, 
    private _router: Router, 
    private _fbStore: AngularFirestore, 
    private store: Store<AppState>) { }

  initAuthListener(){
    this._as.authState.subscribe(
      (user: firebase.User) => {
        if(user){
          this._subUser = this._fbStore.doc(`${user.uid}/user`).valueChanges().subscribe(
            (userFb: any) => {
             let newUser = new User(userFb)
             console.log(newUser)
             this.store.dispatch(new fromAuthActions.SetUserAction(newUser))
          })
        }
        else{
          this._subUser.unsubscribe()
        }
      }
    )
  }

  createUser(data: {name: string, email: string, password: string}){
    this.store.dispatch(new fromUiActions.ActiveLoadingAction())
    this._as.auth.createUserWithEmailAndPassword(data.email, data.password)
    .then(
      (res) => {
        let user: User = {
          uid: res.user.uid,
          name: data.name,
          email: data.email
        }

        this._fbStore.doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this._router.navigateByUrl("/")
            this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
          })
          .catch(
            (err: Error) => {
              console.log(err)
              Swal.fire({
                title: 'Error en registro',
                text: err.message,
                type: 'error'
              })
              this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
            }
          )

      }
    )
    .catch(
      (err: Error) => {
        console.log(err)
        Swal.fire({
          title: 'Error en registro',
          text: err.message,
          type: 'error'
        })
        this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
      }
    )
  }

  login(credentials: {email: string, password: string}){
    this.store.dispatch(new fromUiActions.ActiveLoadingAction())
    this._as.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(
        res => {
          this._router.navigateByUrl("/")
          this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
        }
      )
      .catch(
        (err: Error) => {
          Swal.fire({
            title: 'Error en login',
            text: err.message,
            type: 'error'
          })
          this.store.dispatch(new fromUiActions.DesactiveLoadingAction())
        }
      )
  }

  logout(){
    this._router.navigateByUrl('/login')
    this._as.auth.signOut()
  }

  isAuthenticate(): Observable<boolean>{
    return this._as.authState.pipe(
      map((user: firebase.User) => {
        const isAuthenticate = user != null
        if (!isAuthenticate) {
          this._router.navigateByUrl("/login")
        }
        return isAuthenticate
      }
    ))
  }


}

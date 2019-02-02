import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import * as firebase from 'firebase'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _as: AngularFireAuth, private _router: Router, private _fbStore: AngularFirestore) { }

  initAuthListener(){
    this._as.authState.subscribe(
      (user: firebase.User) => {
        console.log(user)
      }
    )
  }

  createUser(data: {name: string, email: string, password: string}){
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
          })
          .catch(
            (err: Error) => {
              console.log(err)
              Swal.fire({
                title: 'Error en registro',
                text: err.message,
                type: 'error'
              })
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
      }
    )
  }

  login(credentials: {email: string, password: string}){
    this._as.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(
        res => {
          this._router.navigateByUrl("/")
        }
      )
      .catch(
        (err: Error) => {
          Swal.fire({
            title: 'Error en login',
            text: err.message,
            type: 'error'
          })
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

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _as: AngularFireAuth, private _router: Router) { }

  createUser(data: {name: string, email: string, password: string}){
    this._as.auth.createUserWithEmailAndPassword(data.email, data.password)
    .then(
      res => {
        this._router.navigateByUrl("/")
        console.log(res)
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }

  login(credentials: {email: string, password: string}){
    this._as.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(
        res => {
          this._router.navigateByUrl("/")
          console.log(res)
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  }



}

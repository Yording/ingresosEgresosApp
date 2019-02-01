import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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
          console.log(res)
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



}

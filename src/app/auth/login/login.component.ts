import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  signIn(credentials: {email: string, password: string}){
    console.log(credentials)
    this._auth.login(credentials)
  }



}

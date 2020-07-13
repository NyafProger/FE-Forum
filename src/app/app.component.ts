import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rebbit';

  static user:User = null;
  static userLoggedIn: boolean = false;

  constructor(private router: Router){}

  redirectToRegister() {
    this.router.navigate(['./register']);
  }
  getUser(){
    return AppComponent.user;
  }
  userIsLogged(){
    return AppComponent.userLoggedIn;
  }
  redirectToLogin() {
    this.router.navigate(['./login']);
  }
  redirectToHome() {
    this.router.navigate(['./home']);
  }
  logout(){
    AppComponent.userLoggedIn = false;
    localStorage.removeItem("token")
    AppComponent.user = null;
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./home']);
  }); 
  }
}


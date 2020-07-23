import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { User } from './models/user';
import { AccountService } from './services/accountService';
import { NotifierService } from 'angular-notifier';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rebbit';

  static user:User = null;
  static userLoggedIn: boolean = false;
  get user(){
    return AppComponent.user;
  }


  constructor(private router: Router,
     private accountService: AccountService,
      private notifier:NotifierService){

    if (localStorage.getItem("token")!= null){
      this.accountService.getCurrentUser().subscribe(result => {
        AppComponent.user = result; 
        AppComponent.userLoggedIn = true;
        console.log("User was identyfied");
        
      }, 
        error => {
          AppComponent.user = null; 
          console.log(error);
          localStorage.removeItem("token")
          router.navigate(["home"]);
        });  
    }
  }

  redirectToRegister() {
    this.router.navigate(['./register']);
  }
  redirectToAdmin(){
    this.router.navigate(["./admin"]);
  }
  getUser(){
    return AppComponent.user;
  }
  userIsLogged(){
    return AppComponent.userLoggedIn && AppComponent.user;
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


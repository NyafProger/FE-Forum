import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { AccountService } from '../services/accountService';
import {  Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean = false;
  constructor(private builder:FormBuilder, private accountService:AccountService, 
    private router: Router, private notifier:NotifierService ) {
    this.loginForm = builder.group({email:"",password:""}) 
  }
  onSubmit(values){
    this.submitted = true;

    this.accountService.login(values.email, values.password).subscribe(result => { 
      console.log(result["token"]);
      localStorage.setItem("token", result["token"]);
      this.router.navigate(['/home']);
  }, 
      error => {this.submitted=false;
        console.log(error);
      this.notifier.notify("error","Invalid email or password")});
  }

  ngOnInit() {
  }
}

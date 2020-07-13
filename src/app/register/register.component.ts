import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/accountService';
import {  Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted:boolean = false;

  constructor(private builder:FormBuilder, private accountService:AccountService,
     private router: Router, private notifier:NotifierService) {
    this.registerForm = builder.group({userName:"", firstName:"", secondName:"", email:"",password:""});
   }

   onSubmit(values){
    console.log(values);
    this.submitted = true;
    
    this.accountService.register(values).subscribe(result => 
      {
        console.log(result);
        this.router.navigate(['/login']);
    }, 
        error => {this.submitted=false;
          this.notifier.notify("error","Fill in all fields")});
      
  }

  ngOnInit() {
  }

}

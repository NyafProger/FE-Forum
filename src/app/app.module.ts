import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './services/accountService';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PostService } from './services/postService';
import { NotifierModule } from "angular-notifier";
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostComponent,
  ],
  imports: [
    NotifierModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AccountService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }

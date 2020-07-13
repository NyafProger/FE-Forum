import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {Router} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PostComponent} from "./post/post.component";

const routes: Routes = [
  {
    path:"login", component: LoginComponent
  },
  {
    path:"register", component: RegisterComponent
  },
  {
    path:"home", component: HomeComponent
  },
  {
    path:"", redirectTo:"/home", pathMatch:"full"
  },
  {
    path:"post/:id", component: PostComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { CommentService } from '../services/commentService';
import { PostService } from '../services/postService';
import { AdminService } from '../services/adminService';
import { AccountService } from '../services/accountService';
import { AppComponent } from '../app.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  users: User[];
  moderators: User[];
  comments: Comment[];
  posts: Post[];

  
  constructor(private router: Router, 
    private commentService: CommentService, 
    private postService:PostService,
    private adminService: AdminService,
    private accountService: AccountService,
    private notifier:NotifierService) { 
      
      if (localStorage.getItem("token")!= null){
        this.accountService.getCurrentUser().subscribe(result => {
          this.user = result;
          AppComponent.user = result; 
          AppComponent.userLoggedIn = true;
          if (this.user.role == "User"){
            this.notifier.notify("error","Only admin area!")
            this.router.navigate(["home"]);
          }
          else{
            this.loadData();
          }
          console.log("User was identyfied");
          
        }, 
          error => {
            AppComponent.user = null; 
            AppComponent.userLoggedIn = false;
            console.log(error);
            localStorage.removeItem("token")
            router.navigate(["home"]);
          });  
      }
      else{
        this.router.navigate(["home"]);
      }
    }
  updateComments(){
    this.adminService.getAllComments().subscribe(result=>{
      
      this.comments = result;
    }, error=>{
      console.log(error);
      this.notifier.notify("warning", "Can't load comments!");
    });
  }
  updateUsers(){
    this.adminService.getUsersInRole("User").subscribe(result=>{
      this.users = result;
    }, error=>{
      console.log(error);
      this.notifier.notify("warning", "Can't load users!");
    });
  }

  updateMods(){
    this.adminService.getUsersInRole("Moderator").subscribe(result=>{
      this.moderators = result;
    }, error=>{
      console.log(error);
      this.notifier.notify("warning", "Can't load mods!");
    });
  }

  updatePosts(){
    this.postService.getAllPosts().subscribe(result=>{
      this.posts = result;
    },error =>{
      console.log(error);
      this.notifier.notify("warning", "Can't load posts!");
    });
  }

  deletePost(id:number){
    this.adminService.deletePost(id).subscribe(result =>{
      this.updatePosts();
      this.notifier.notify("success","Post was deleted")
    },
    err=> {
      this.notifier.notify("error","Oppss, something goes wrong. Try again")
    }
    );}

    redirectToHome(){
      this.router.navigate(["/home"]);
    }

    deleteComment(id:number){
      this.adminService.deleteComment(id).subscribe(result =>{
        this.updateComments();
        this.notifier.notify("success","Comment was deleted")
      },
      err=> {
        this.notifier.notify("error","Oppss, something goes wrong. Try again")}
      );}

  loadData(){
    this.updateComments();
    this.updatePosts();
    this.updateUsers();
    this.updateMods();
  }
  ngOnInit() {
  }

  assignToRole(id,name,role){
    this.adminService.updateUserRole(id, role).subscribe(
      result=>{
        this.updateUsers();
        this.updateMods();
        this.notifier.notify("success", "User "+name+" is now "+role+"!");
        console.log(result);
        
      },error=>{
        console.log(error);
        
      }
    )

  }
}

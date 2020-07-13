import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/postService';
import { Post } from '../models/post';
import { User } from '../models/user';
import { AccountService } from '../services/accountService';
import { AppComponent } from '../app.component';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postForm: FormGroup;
  postFormInvisible: boolean = true;
  posts: Post[];
  user: User;
  submitted:boolean = false;
  edited:boolean = false
  idEdited: number = 0;
  
  constructor(private builder:FormBuilder, private postService:PostService,
     private accountService:AccountService,  private notifier:NotifierService, private router:Router) {
    
    if (localStorage.getItem("token")!= null){
      accountService.getCurrentUser().subscribe(result => {
        this.user = result;
        AppComponent.user = result; 
        AppComponent.userLoggedIn = true;
        this.postFormInvisible = false;
        this.postForm = builder.group({id:0,title:"", text:"", anon: false, authorId: this.user.id});
        console.log("User was identyfied");
      }, 
        error => {
          AppComponent.user = null; 
          AppComponent.userLoggedIn = false;
          console.log(error);
          localStorage.removeItem("token")
          this.postFormInvisible = true;
        });  
    }
    this.updatePostList();
  }

  updatePostList(){
    this.postService.getAllPosts().subscribe(result=>
      {this.posts = result; console.log(result);
    }
      ,error=>{console.log("Error");
      console.log(error);
      
      })
  }

  updatePost(post: Post){
    this.edited = true;
    this.postForm.controls["id"].setValue(post.id);
    this.postForm.controls["title"].setValue(post.title);
    this.postForm.controls["text"].setValue(post.text);
    this.postForm.controls["authorId"].setValue(post.author.id);
    this.postForm.controls["anon"].setValue(post.anonymous);
    // this.postService.updatePost(this.postForm.value).subscribe(result =>{
    //   this.updatePostList();
    //   this.edited = false;
    //   this.notifier.notify("success","Post was edited")
    // },
    // err =>{
    //   this.edited = false;
    //   this.notifier.notify("error","Oppss, something goes wrong. Try again")
    // })
  }

  deletePost(id:number){
    this.postService.deletePost(id).subscribe(result =>{
      this.updatePostList();
      this.notifier.notify("success","Post was deleted")
    },
    err=> {
      this.notifier.notify("error","Oppss, something goes wrong. Try again")
    }
    );}
    
  ngOnInit() {
  }
  redirectPost(id:any)
  {
    this.router.navigate(["/post/"+id]);
  }
  
  onSubmit(){
    this.submitted = true;
    this.postForm.controls["id"].setValue(0);
    this.postService.createPost(this.postForm.value).subscribe(result => {
      console.log(result);
      this.submitted = false;
      this.posts.push(result);
      this.notifier.notify("success","Post is published")
    },
    err=>{
      this.submitted=false;
      console.log(err);
      this.notifier.notify("error","Oppss, something goes wrong. Try again")
    })
  }
}

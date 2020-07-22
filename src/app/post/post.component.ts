import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/accountService';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/postService';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { AppComponent } from '../app.component';
import { CommentService } from '../services/commentService';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  post: Post;
  user: User;
  edited: boolean = false;
  editedComment: Comment;
  comments: Comment[];
  submitted:boolean = false;
  commentForm:FormGroup;
  commentFormInvisible:boolean = true;
  
  constructor(private builder:FormBuilder,
    private accountService:AccountService,
    private postService:PostService,
    private router: Router,
    private notifier:NotifierService,
    private route: ActivatedRoute,
    private commentService:CommentService) {

    this.comments = [];
    if (this.post == null)
    {
      let id = route.snapshot.paramMap.get("id");
      postService.getById(id).subscribe(result => {this.post = result;
        this.updateCommentList();
        if (localStorage.getItem("token")!= null){
          accountService.getCurrentUser().subscribe(result => {
            this.user = result;
            AppComponent.user = result; 
            AppComponent.userLoggedIn = true;
            this.commentFormInvisible = false;
            this.commentForm = builder.group({postId:this.post.id, text:"", anonymous: false, authorId: this.user.id});
            console.log("User was identyfied");},                                     
            error => {
              AppComponent.user = null; 
              AppComponent.userLoggedIn = false;
              console.log(error);
              localStorage.removeItem("token")
              this.commentFormInvisible = true;});  
        }},
         error => {this.notifier.notify("error","Opps");
        console.log(error);
        router.navigate(["/home"]);
        });
    }
  }

  updateCommentList(){
    this.commentService.getCommentsByPost(this.post.id).subscribe(result=>
      {this.comments = result; console.log(result);
    }
      ,error=>{console.log("Error");
      console.log(error);
      
      })
  }

  updateComment(){
    this.submitted = true;
    
    this.editedComment.text = this.commentForm.controls["text"].value;
    this.editedComment.anonymous= this.commentForm.controls["anonymous"].value;
    this.editedComment.author = null;
    
    this.commentService.updateComment(this.editedComment).subscribe(result =>{
      this.updateCommentList();
      this.submitted = false;
      this.notifier.notify("success","Comment was edited")
      this.edited = false;
      this.commentForm = this.builder.group({id:0,title:"", text:"", anonymous: false, authorId: this.user.id});
    },
      err =>{
      this.submitted = false;
      this.edited = false;
      this.notifier.notify("error","Oppss, something goes wrong. Try again")
    })
  }

  editComment(comment: Comment){
    this.edited = true;
    this.editedComment = comment;
    this.commentForm.controls["text"].setValue(comment.text);
    this.commentForm.controls["anonymous"].setValue(comment.anonymous);
  }

  deleteComment(id:number){
    this.commentService.deleteComment(id).subscribe(result =>{
      this.updateCommentList();
      this.notifier.notify("success","Comment was deleted")
    },
    err=> {
      this.notifier.notify("error","Oppss, something goes wrong. Try again")}
    )};
  ngOnInit() {}
  
  redirectToHome(){
    this.router.navigate(["/home"]);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.user);
    this.commentService.createComment(this.commentForm.value).subscribe(result => {
      console.log(result);
      this.submitted = false;
      this.comments.push(result);
      this.notifier.notify("success","Comment is published")
      this.commentForm.controls["text"].setValue("");
      this.commentForm.controls["anonymous"].setValue(false);
    },
    err=>{
      this.submitted=false;
      console.log(err);
      this.notifier.notify("error","Oppss, something goes wrong. Try again")
    })
  }
}
  

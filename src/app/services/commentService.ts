import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment'

@Injectable({
    providedIn: 'root',
  })

export class CommentService{
    apiUrl = "https://localhost:5001/api";
    constructor(private http:HttpClient){}

    createHeaders(): HttpHeaders{
        let headers = new HttpHeaders();
        
        if (localStorage.getItem("token")){
            console.log("Token added to headres");
            headers = new HttpHeaders({"Authorization": "Bearer "+localStorage.getItem("token")});            
        }
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', '*');
        headers.append('Access-Control-Allow-Origin', '*');
        
        return headers;
    }

    getCommentsByPost(postId):Observable<Comment[]>{
        
        return this.http.get<Comment[]>(this.apiUrl+"/post/"+postId+"/comments");
    }

    createComment(commentToCreate:any):Observable<Comment>{
        return this.http.post<Comment>(this.apiUrl+"/comment", commentToCreate, {headers:this.createHeaders()});
    }
    deleteComment(id:number){
        return this.http.delete(this.apiUrl+"/comment/"+id, {headers:this.createHeaders()});
    }
    updateComment(commentToUpdate:any):Observable<Comment>{
        return this.http.put<Comment>(this.apiUrl+"/comment", commentToUpdate, {headers:this.createHeaders()});
    }
}
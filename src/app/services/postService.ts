import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
    providedIn: 'root',
  })

export class PostService{
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
        return headers;
    }

    getAllPosts():Observable<Post[]>{
        
        return this.http.get<Post[]>(this.apiUrl+"/post");
    }

    createPost(postToCreate:any):Observable<Post>{
        return this.http.post<Post>(this.apiUrl+"/post", postToCreate, {headers:this.createHeaders()});
    }
    getById(id:any):Observable<Post>{
        return this.http.get<Post>(this.apiUrl + "/post/"+id, {headers:this.createHeaders()});
    }
    deletePost(id:number){
        return this.http.delete(this.apiUrl + "/post/"+id, {headers:this.createHeaders()});
    }
    updatePost(postToUpdate: any):Observable<Post>{
        return this.http.put<Post>(this.apiUrl + "/post/",postToUpdate, {headers:this.createHeaders()})
    }
}
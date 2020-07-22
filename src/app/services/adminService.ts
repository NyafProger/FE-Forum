import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
  })
export class AdminService{
    apiUrl = "https://localhost:5001/api";
    constructor(private http:HttpClient){}

    createHeaders(): HttpHeaders{
        let headers = new HttpHeaders();
        
        if (localStorage.getItem("token")){
            console.log("Token added to headres");
            headers = new HttpHeaders({"Authorization": "Bearer "+localStorage.getItem("token")});            
            console.log(headers.get("Authorization"));
        }
        headers.append('Access-Control-Allow-Headers', '*');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Methods', '*');
        headers.append('Access-Control-Allow-Origin', '*');
        console.log("HEADERS FROM ADMIN ");
        
        console.log(headers);
        
        return headers;
    }

    getUsersInRole(role){
        return this.http.get<User[]>(this.apiUrl+"/admin/user/role/"+role,{headers:this.createHeaders()});
    }

    getAllUsers(){
        return this.http.get<User[]>(this.apiUrl+"/user",{headers:this.createHeaders()});
    }
    getAllComments(){
        return this.http.get<Comment[]>(this.apiUrl+"/comment",{headers:this.createHeaders()});
    }

    deleteComment(id){
        if(id != null)
            return this.http.delete(this.apiUrl+"/admin/comment/"+id,{headers:this.createHeaders()});
    }
    deletePost(id){
        if (id != null)
            return this.http.delete(this.apiUrl+"/admin/post/"+id,{headers:this.createHeaders()});
    }

    updateUserRole(id, role){
        return this.http.delete(this.apiUrl+"/admin/user/"+id+"/role/"+role,{headers:this.createHeaders()});
    }
}
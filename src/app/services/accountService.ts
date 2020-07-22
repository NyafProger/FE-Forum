import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
  })
export class AccountService{
    //{token: "asdasdasdasd"}
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

    login(email, password){

        return this.http.post(this.apiUrl+"/account/login", {email, password}, {headers:this.createHeaders()})
    }

    register(values: Register){
        return this.http.post(this.apiUrl+"/account/register", values, {headers:this.createHeaders()})
    }

    getCurrentUser(): Observable<User>{
        
        return this.http.get<User>(this.apiUrl+"/user/identify", {headers:this.createHeaders()})
    }

}
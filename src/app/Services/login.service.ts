import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl + '/users';
  }

  login(user: User){
    return this.http.put<User>(this.url + '/login', user);
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserProfile } from '../Classes/user-profile';
import { User } from '../Classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  currentUser: User;
  currentUserProfile: UserProfile;
  

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { 
    this.url = environment.baseUrl + '/users';
  }

  addUser(user: User) {
    this.http.post(this.url, user).subscribe(
      user => { this.userLogin(user as User);
          // this.router.navigate(['/editProfile']);
      }

    );
    // this.router.navigate(['/editProfile']);

  }


  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.url + `/${id}`);
  }

  userLogin(user: User){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.loginService.login(user).subscribe(user => 
      {this.currentUser = user;
        this.currentUser.password = null;
        this.currentUserProfile = this.currentUser.userProfile;
        console.log(this.currentUserProfile);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        location.reload();
      });
      
      this.router.navigate(['/home']);


  }

  userLogout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    location.reload();
  }



}

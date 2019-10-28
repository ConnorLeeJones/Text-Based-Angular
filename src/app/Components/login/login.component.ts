import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  public user: User = new User();
  public currentUser: User;

  constructor(private service: UserService,
    private http: HttpClient,
    private router: Router
    ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges(){
    location.reload();
  }

  onSubmit() {
    this.service.userLogin(this.user);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    this.service.userLogout();
  }


}

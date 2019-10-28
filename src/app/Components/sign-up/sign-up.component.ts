import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();

  constructor(private service: UserService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.service.addUser(this.user);
    // this.service.userLogin(this.user);
    // this.router.navigate(['editProfile']);

    // this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { PlayerForm } from 'src/app/Classes/player-form';
import { PlayerService } from 'src/app/Services/player.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { SourceListMap } from 'source-list-map';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.css']
})
export class NewPlayerComponent implements OnInit {

  tempUser: User = new User();
  newPlayer: PlayerForm = new PlayerForm();
  gameId: number;

  constructor(private service: PlayerService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(){
    this.tempUser = JSON.parse(localStorage.getItem('currentUser'));
    this.gameId = this.tempUser.userId;
    console.log(this.gameId);
    console.log(this.tempUser);

  }

  onSubmit() {
    //this.tempUser = JSON.parse(localStorage.getItem('currentUser'));
    this.gameId = this.tempUser.userId;
    console.log(this.gameId);
    console.log(this.gameId);
    this.newPlayer.gameId = this.tempUser.userId;
    this.service.addPlayer(this.newPlayer);
    //console.log(this.newPlayer)
  }

}

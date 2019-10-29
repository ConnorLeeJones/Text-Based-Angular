import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/Classes/player';
import { PlayerService } from 'src/app/Services/player.service';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  currentUser : User;
  players: Player[];

  constructor(private playerService: PlayerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.players = this.currentUser.userProfile.game.players;
  }

  ngOnInit() {
    console.log(this.players);
  }

}

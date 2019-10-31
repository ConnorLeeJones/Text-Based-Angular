import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/Services/battle.service';
import { User } from 'src/app/Classes/user';
import { Player } from 'src/app/Classes/player';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  currentUser : User;
  players: Player[];
  gameId : number;


  constructor(private battleService: BattleService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.players = this.currentUser.userProfile.game.players;
    this.gameId = this.currentUser.userId;
  }

  ngOnInit() {
  }

  newBattle(){
    this.battleService.newBattle(this.gameId);
  }

}

import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/Services/battle.service';
import { User } from 'src/app/Classes/user';
import { Player } from 'src/app/Classes/player';
import { PlayerForm } from 'src/app/Classes/player-form';
import { BattleModel } from 'src/app/Classes/battle-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  currentUser : User;
  players: Player[];
  gameId : number;
  playerForm: PlayerForm = new PlayerForm();
  battle: BattleModel;
  battleText: String = new String();


  constructor(private battleService: BattleService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.players = this.currentUser.userProfile.game.players;
    this.gameId = this.currentUser.userId;
    this.playerForm.gameId = this.currentUser.userId;
  }

  ngOnInit() {
    this.newBattle();
  }

  newBattle(){
    this.battleService.newBattle(this.playerForm).subscribe(
      battle => {
        this.battle = battle as BattleModel;
        this.startBattle();
      });
  }

  startBattle(){
    this.battleText = "Start";

    for (let creature in this.battle.creatures){
      console.log("Test");
      if (this.players.includes(creature)){
        console.log("No");
      }
    }

    console.log(this.battle);
  }

}

import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/Services/battle.service';
import { User } from 'src/app/Classes/user';
import { Player } from 'src/app/Classes/player';
import { PlayerForm } from 'src/app/Classes/player-form';
import { BattleModel } from 'src/app/Classes/battle-model';
import { Observable } from 'rxjs';
import { Monster } from 'src/app/Classes/monster';
import { Creature } from 'src/app/Classes/creature';
import { Stat } from 'src/app/Classes/stat';
import { PlayerTurnComponent } from '../player-turn/player-turn.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  currentUser : User;
  players: Player[];
  monsters: Monster[];
  creatures: Creature[] = [];
  gameId : number;
  playerForm: PlayerForm = new PlayerForm();
  battle: BattleModel;
  battleText: String = new String();
  playerTurnComponent: PlayerTurnComponent = new PlayerTurnComponent();
  isPlayerTurn: boolean = false;
  i: number = 0;
  choice: String;


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
        this.monsters = this.battle.monsters;
        this.startBattle();
      });
  }

  startBattle(){
    this.battleText = "Start";
    this.arraysetUp();
    this.turns();
  }

  turns(){
    console.log(this.i);
    this.battleText = this.creatures[this.i] + "'s turn.";
    this.i -= this.removeDeadPlayers();
    if (this.players.includes(this.creatures[this.i])) {
      console.log("Player");
      this.playerTurn(this.creatures[this.i]);
    } 
    else if (this.monsters.includes(this.creatures[this.i])){
      console.log("Mon");
      this.monsterTurn(this.creatures[this.i]);
    } else {
      console.log("done");
    }
  }




  arraysetUp(){
    for (let i = 0; i < this.players.length; i++) {
      this.creatures[i] = this.players[i];
    }
    for (let i = this.players.length; i < this.monsters.length + this.players.length; i++) {
      this.creatures[i] = this.monsters[i - this.players.length];
    }
    this.creatures.sort((a, b) => (a.stats["SPEED"] < b.stats["SPEED"] ? 1 : -1));
    console.log(this.creatures);
  }


  creatureIsAlive(creature: Creature): boolean{
    return creature.stats["HP"] > 0;
  }

  removeDeadPlayers(): number{
    let deadPlayers = 0;
    for (let i = 0; i < this.creatures.length; i++){
      if (!this.creatureIsAlive(this.creatures[i])){
        delete this.creatures[i];
        deadPlayers++;
      }
    }
    return deadPlayers;
  }

  getTotalHp(creautreArr: Creature[]): number{
    let totalHp = 0;
    for (let i = 0; i < creautreArr.length; i++){
      totalHp += creautreArr[i].stats["HP"];
    }
    return totalHp;
  }

  checkWin(): boolean{
    return this.getTotalHp(this.monsters) <= 0;
  }

  checkLose(): boolean{
    return this.getTotalHp(this.players) <= 0;
  }

  playerTurn(player : Creature){
    //alert("Player turn");
    console.log("p turn");
    this.isPlayerTurn = true;
    let choice: String;
    this.getUserChoice();

    //choice = this.getUserChoice();
    this.isPlayerTurn = false;
    //this.i++;
    //this.turns();
  }

  monsterTurn(monster : Creature){
    console.log("Mon turn");
    this.i++;
    this.turns();
  }


  getUserChoice() {
    console.log("player turn");
    var ch = document.getElementById("choice");
    ch.style.display = "block";
    let buttons = ['Attack', 'Defend', 'Spell'];
    this.buttonSetUp(buttons);
  }




  continueCode(choice: any){
    alert(choice);
    switch (choice){
      case "Attack":
        this.playerAttack();


    }
    // this.i++;
    // this.turns();
  }

  playerAttack(){
    let monsterNames = [];
    this.monsters.forEach(monster => monsterNames.push(monster.name))
    this.buttonSetUp(monsterNames);
  }



  buttonSetUp(buttons: any[]){
    document.getElementById("buttons").innerHTML = "";
    buttons.forEach(button => {
      let b = document.createElement("button");
      b.id = button;
      b.innerText = button;
      b.className = "btn btn-secondary";
      console.log(b);
      b.addEventListener('click', () => this.continueCode(button))
      document.getElementById("buttons").appendChild(b);
  });
  }

}
import { Component, OnInit, OnChanges } from '@angular/core';
import { BattleService } from 'src/app/Services/battle.service';
import { User } from 'src/app/Classes/user';
import { Player } from 'src/app/Classes/player';
import { PlayerForm } from 'src/app/Classes/player-form';
import { BattleModel } from 'src/app/Classes/battle-model';
import { Observable } from 'rxjs';
import { Monster } from 'src/app/Classes/monster';
import { Creature } from 'src/app/Classes/creature';
import { Stat } from 'src/app/Classes/stat';
import { AttackDto } from 'src/app/Classes/attack-dto';
import { PlayerService } from 'src/app/Services/player.service';
import { AttackService } from 'src/app/Services/attack.service';
import { Router } from '@angular/router';

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
  i: number = 0;
  choice: String;
  attackDto: AttackDto = new AttackDto();


  constructor(private battleService: BattleService, private playerService: PlayerService, private attackService: AttackService, private router: Router) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.playerService.getPlayers().subscribe(players => this.players = players as Player[]);
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
        this.players = this.battle.players;
        // this.creatures = this.battle.creatures;
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
    this.attackDto = new AttackDto();
    this.arraysetUp();
    this.checkConditions();
    //this.i -= this.removeDeadPlayers();
    if (this.i < 0){
      this.finish();
    } else if (this.i >= this.creatures.length){
      this.i = 0;
    }

    
    this.battleText = this.creatures[this.i].name + "'s turn.";
    console.log(this.creatures[this.i].name);

    console.log(this.i);
    if (!this.creatureIsAlive(this.creatures[this.i])){
        this.creatures[this.i].stats["HP"] = 0;
        this.i++;
        this.turns();
    } else if (this.players.includes(this.creatures[this.i])) {
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


  finish(){
    alert("Game over");
    this.i = -100;
    this.battleService.battle = this.battle;
    this.router.navigate(['/xp']);


  }


  arraysetUp(){
    for (let i = 0; i < this.players.length; i++) {
      this.creatures[i] = this.players[i];
    }
    for (let i = this.players.length; i < this.monsters.length + this.players.length; i++) {
      this.creatures[i] = this.monsters[i - this.players.length];
    }
    this.creatures.sort((a, b) => (a.stats["SPEED"] < b.stats["SPEED"] ? 1 : -1));
    this.attackDto.battleId = this.battle.battleId;
  }


  creatureIsAlive(creature: Creature): boolean{
    return creature.stats["HP"] > 0;
  }

  getTotalHp(creautreArr: Creature[]): number{
    let totalHp = 0;
    console.log("DFDSFSDFSD");
    for (let i = 0; i < creautreArr.length; i++){
      if (!(creautreArr[i].stats["HP"] < 0)){
        totalHp += creautreArr[i].stats["HP"];
      }
      //totalHp += creautreArr[i].stats["HP"];
      console.log(totalHp);
      console.log(creautreArr[i]);
    }
    return totalHp;
  }

  // checkWin(): boolean{
  //   return this.getTotalHp(this.monsters) <= 0;
  // }

  // checkLose(): boolean{
  //   return this.getTotalHp(this.players) <= 0;
  // }

  checkConditions() {
    if (this.getTotalHp(this.players) <= 0){
      console.log("YOU LOSE");
      this.finish();
    } else if (this.getTotalHp(this.monsters) <= 0){
      console.log("YOU WIN");
      this.finish();
    }
  }

  playerTurn(player : Creature){
    console.log("p turn");
    let choice: String;
    this.getUserChoice();
  }

  monsterTurn(monster : Creature){
    console.log("Mon turn");
    console.log(this.creatures[this.i].creature_id);

    this.attackDto.attacker = this.creatures[this.i];
    let num = Math.floor(Math.random() * this.players.length);
    console.log(num);
    this.attackDto.attacked.push(this.players[num]);

    this.attackDto.choice = "Attack";
    console.log(this.attackDto);

    this.attackService.attack(this.attackDto, this.battle);

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
    this.attackDto.choice = choice;
    switch (choice){
      case "Attack":
        this.playerAttack();
    }
  }

  chooseMonster(choice: any){
    console.log(choice);
    this.attackDto.attacker = this.creatures[this.i];
    this.attackDto.attacked.push(choice);
    console.log(this.attackDto);
    this.attackService.attack(this.attackDto, this.battle);
    this.i++;
    this.turns();
  }

  playerAttack(){
    let monsterNames = [];
    this.monsters.forEach(monster => {
      if (monster.stats["HP"] > 0){
      monsterNames.push(monster)}});
    this.buttonSetUp(monsterNames);
  }



  buttonSetUp(buttons: any[]){
    document.getElementById("buttons").innerHTML = "";
    let mon = 0;
    buttons.forEach(button => {
      let b = document.createElement("button");
      b.id = button;
      b.innerText = button;
      b.className = "btn btn-secondary";
      console.log(b);
      if (buttons.includes('Attack')){
        b.addEventListener('click', () => this.continueCode(button))
      } else {
        b.addEventListener('click', () => this.chooseMonster(button))
        b.innerText = button.name + "";
        mon++;
      }
      document.getElementById("buttons").appendChild(b);
  });
  }

}

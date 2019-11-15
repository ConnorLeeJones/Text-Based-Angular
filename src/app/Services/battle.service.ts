import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Player } from '../Classes/player';
import { PlayerForm } from '../Classes/player-form';
import { BattleModel } from '../Classes/battle-model';
import { Observable } from 'rxjs';
import { AttackDto } from '../Classes/attack-dto';


@Injectable({
  providedIn: 'root'
})
export class BattleService {
  url: string;
  battle: BattleModel;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl + '/battles';
  }


  newBattle(playerForm : PlayerForm){
    //console.log(gameId);
    return this.http.post(this.url, playerForm);
    //return this.battle;
    

  }

  attack(attackDto: AttackDto){
    return this.http.put(this.url, attackDto);
  }
  

}

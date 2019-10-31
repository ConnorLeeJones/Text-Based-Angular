import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Player } from '../Classes/player';


@Injectable({
  providedIn: 'root'
})
export class BattleService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl + '/battles';
  }


  newBattle(gameId: number){
    console.log(gameId);
    return this.http.post(this.url, gameId).subscribe();

  }

}

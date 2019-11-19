import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Classes/user';
import { PlayerForm } from '../Classes/player-form';
import { Observable } from 'rxjs';
import { Player } from '../Classes/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentUser : User;
  url: string;



  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl + '/players';
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  addPlayer(newPlayer: PlayerForm){
    return this.http.post(this.url, newPlayer).subscribe();
  }

  getPlayers() {
    return this.http.get(this.url + '/' + this.currentUser.userId);
  }


  getPlayerById(id: number): Observable<Player>{
    console.log(this.url + '/id/' + id);
    return this.http.get<Player>(this.url + '/id/' + id);
  }

  updatePlayer(player: Player): Observable<Player>{
    console.log(this.url);
    return this.http.put<Player>(this.url, player);
  }


}

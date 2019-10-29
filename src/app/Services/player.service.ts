import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Classes/user';
import { PlayerForm } from '../Classes/player-form';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentUser : User;
  url: string;



  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl + '/players';
  }

  addPlayer(newPlayer: PlayerForm){
    return this.http.post(this.url, newPlayer).subscribe();
  }

  // getPlayers(){
  //   return this.http.get(this.url).subscribe();
  // }


}

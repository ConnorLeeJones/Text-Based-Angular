import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/Services/battle.service';
import { PlayerService } from 'src/app/Services/player.service';

@Component({
  selector: 'app-finish-battle',
  templateUrl: './finish-battle.component.html',
  styleUrls: ['./finish-battle.component.css']
})
export class FinishBattleComponent implements OnInit {

  constructor(private battleService: BattleService, private playerService: PlayerService) { }

  ngOnInit() {
    console.log(this.battleService.battle)
    this.xp();
  }


  xp(): void{
    let totalXp = 0;
    this.battleService.battle.monsters.forEach(mon => {
      totalXp += mon.stats["XP"];
    });
    this.battleService.battle.players.forEach(player => {
      player.stats["XP"] += totalXp;
      console.log(player.name + " gained " + totalXp + " xp.");
      this.playerService.updatePlayer(player).subscribe(player => console.log(player));
    });
  }

}

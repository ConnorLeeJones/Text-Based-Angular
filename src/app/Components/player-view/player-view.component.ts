import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/Services/player.service';
import { Player } from 'src/app/Classes/player';
import { Stat } from 'src/app/Classes/stat';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {
  
  @Input() player: Player;
  stats: any;
  bleh: Stat[] = [];

  constructor(private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayer();
  }

  getPlayer() {
    const id = +this.route.snapshot.paramMap.get('playerId');
    this.playerService.getPlayerById(id).subscribe(player => { this.player = player,
      this.stats = Object.entries(this.player.stats)
      console.log(this.stats);
      //console.log(Object.entries(this.stats));

      for (let i = 0; i < this.stats.length; i++) {
        this.bleh[i] = new Stat(this.stats[i].key, this.stats[i].key);
        // this.bleh[i].stat = this.stats[i].key;
        // this.bleh[i].value = this.stats[i].key;
        console.log(this.bleh[i]);
      }

      

      for (let [key, value] of this.stats) {
        console.log(`${key} ${value}`);
      }
       

      // let result = Object.keys(Object.entries(this.stats)).map(function(key) {
      //   return [Number(key), this.stats[key]];
      // });
      // console.log(result);

    });
  }

}

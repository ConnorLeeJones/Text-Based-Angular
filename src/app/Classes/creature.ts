import { Stat } from './stat';
import { ɵisDefaultChangeDetectionStrategy } from '@angular/core';

export class Creature {

    name: String;
    stats: Stat[];
    creature_id: number;

    constructor(){}

    getStatValue(){
        return "XXX";
        // this.stats.forEach(element => {
        //     console.log(element.stat);
        //     console.log(element.value);
        // });
    }

}

import { Stat } from './stat';
import { ɵisDefaultChangeDetectionStrategy } from '@angular/core';

export class Creature {

    name: String;
    stats: Stat[];

    constructor(){}

    getStatValue(){
        return "XXX";
        // this.stats.forEach(element => {
        //     console.log(element.stat);
        //     console.log(element.value);
        // });
    }

}

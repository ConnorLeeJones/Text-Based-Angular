import { Player } from './player';
import { Monster } from './monster';
import { Creature } from './creature';

export class BattleModel {

    battleId: number;
    players: Player[];
    monsters: Monster[];
    creatures: Creature[];
    

    constructor(){}

}

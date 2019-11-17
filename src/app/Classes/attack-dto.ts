import { Creature } from './creature';

export class AttackDto {
    attackerId: number;
    choice: string;
    opponentId: number;
    battleId: number;
    attacker: Creature = new Creature();
    attacked: Creature[] = [];

    constructor(){}
}

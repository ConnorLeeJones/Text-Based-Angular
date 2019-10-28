import { User } from './user';
import { Game } from './game';

export class UserProfile {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    user: User;
    game: Game;

    constructor(){}
}

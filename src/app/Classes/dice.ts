export class Dice {

    sides: number;

    constructor(sides: number){
        this.sides = sides;
    }

     roll() : number {
        return Math.ceil(Math.random() * this.sides);
    }

    getSides() {
        return this.sides;
    }

    setSides(sides: number) {
        this.sides = sides;
    }

}

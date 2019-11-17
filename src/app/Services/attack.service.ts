import { Injectable } from '@angular/core';
import { AttackDto } from '../Classes/attack-dto';
import { Dice } from '../Classes/dice';
import { BattleModel } from '../Classes/battle-model';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AttackService {


  d10 = new Dice(10);
  damage = 0;
  message: String;

  constructor() { }




  dealDamage(attackDTO: AttackDto, battleModel: BattleModel) {
    //        Optional<Player> player = Optional.of(playerRepository.findById(attackDTO.getPlayerId()).get());
    //        Optional<Monster> monster = monsterRepository.findById(attackDTO.getMonsterId());
            switch (attackDTO.choice) {
                case "Attack":
                    this.attack(attackDTO, battleModel);
                    break;
                default:
                    break;
            }
            //return repository.save(battleModel);
        }
    
    
        attack(attackDTO: AttackDto, battleModel: BattleModel) {
            // Creature attacker = creatureRepository.findById(attackDTO.getAttackerId()).orElse(null);
            // Creature opponent = creatureRepository.findById(attackDTO.getOpponentId()).orElse(null);
            this.damage = 0;
            console.log(attackDTO);
            console.log(battleModel);
            console.log(attackDTO.attacked);
      
            if (this.d10.roll() >= 2){
                this.damage -= this.d10.roll() + attackDTO.attacker.stats["STRENGTH"];
                this.message = attackDTO.attacker.name + " dealt " + this.damage * -1 + " damage to " + attackDTO.attacked[0].name + ".";
            } else {
                this.message = "Miss!";
            }
            
            attackDTO.attacked.forEach(creature => {
              creature.stats["HP"] = creature.stats["HP"] + this.damage;
                console.log(creature.stats["HP"]);
                console.log(creature);
            });


            attackDTO.attacked.forEach(creature => {
              if (battleModel.creatures.includes(creature)){
                console.log("AFDAJFHDSKJFHKSJHSKF");
                console.log(creature);
              }
            });

            console.log(battleModel);

            console.log(this.message);
            //return battleModel;
        }
    
    
        finishAttack(attackDTO: AttackDto){
            // BattleModel battleModel = repository.findById(attackDTO.getBattleId()).orElse(null);
            // ArrayList<Monster> mons = new ArrayList<>();
            // for (Monster monster : battleModel.getMonsters()){
            //     if (monster.getStat(Stats.HP) <= 0){
            //         creatureRepository.delete(monster);
            //     } else {
            //         mons.add(monster);
            //     }
            // }
            // ArrayList<Player> players = new ArrayList<>();
            // for (Player player : battleModel.getPlayers()){
            //     if (player.getStat(Stats.HP) <= 0){
            //         player.setStat(Stats.HP, 0);
            //     }
            //     players.add(player);
            // }
            // battleModel.setMonsters(mons);
            // battleModel.setPlayers(players);
    
            // return repository.save(battleModel);
        }


}





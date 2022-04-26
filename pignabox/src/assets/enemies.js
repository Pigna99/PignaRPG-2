import { Weakness } from "./classes";

class Enemy{
    constructor(name, type_id, experience_given, hp, strenght, constitution, intelligence, speed, fortune, movement, weakness, abilities_enemy){
        this.name= name;
        this.type_id= type_id;
        this.level = 1; //how to set the level?
        this.experience_given = experience_given;
        this.stats = 
        {
            hp:hp,
            //enemies don't use mp
            strenght:strenght,
            constitution:constitution,
            intelligence:intelligence,
            speed:speed,
            fortune:fortune,
            movement:movement,
        }
        //resistence of status and elements
        this.weakness = weakness;
        this.abilities_enemy = abilities_enemy;
        //accuracy of an enemy? NO: accuracy is in the abilities (attacks and other)
    }
}


const listEnemies = 
[
    {//0 
        ...new Enemy("Frog", 0, 100, 100, 10, 10, 10, 10, 10, 3, new Weakness(1,1,1,1,1,1,1,1), [])
    }
]


export {listEnemies}
import { Weakness } from "./classes";

class Enemy{
    constructor(name, type_id, ai, experience_given, hp, strenght, constitution, intelligence, speed, fortune, movement, weakness, abilities_enemy){
        this.name= name;
        this.ai = ai;
        this.type_id= type_id;
        this.level = 1; //how to set the level?
        this.experience_given = experience_given;
        this.stats = 
        {
            hp:hp,
            mp:0,
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

//AIs
//"heavy" - slow, go vs you and attack near u
//"fast" - go vs you, attack and run away
//"ranged" - stay at a fixed distance and do ranged attacks


const listEnemies = 
[
    {//0 
        ...new Enemy("Frog", 1,"heavy", 100, 100, 10, 10, 10, 10, 10, 3, new Weakness(1,0,1,1,1,1,1,1), [])
    },
    {//1
        ...new Enemy("Fat", 4, "heavy", 100, 20, 10, 10, 10, 5, 20, 2, new Weakness(1,1,1,1,1,1,1,1), [])
    }
]


export {listEnemies}
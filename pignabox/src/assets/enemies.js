class Enemy{
    constructor(name, type_id, experience_given, hp, strenght, constitution, intelligence, speed, fortune, movement, abilities_enemy){
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
        this.weakness =
        {
            elements:{//elements
                fire: 0, water: 0, ice: 0, air: 0
            },
            status:{//status
                slow: 0, blind: 0 , mute: 0, poison: 0,
            },
        }
        this.abilities_enemy = abilities_enemy;
    }
}


const listEnemies = 
[
    {//0 
        ...new Enemy("Frog", 0, 100, 100, 10, 10, 10, 10, 10, 3, [])
    }
]


export {listEnemies}
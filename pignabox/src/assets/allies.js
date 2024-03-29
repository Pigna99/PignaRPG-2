import { Weakness } from "./classes";
class Ally{
    constructor(name, type_id, hp, mp, strenght, constitution, intelligence, speed, fortune, abilities, spells){
        this.name= name;
        this.type_id= type_id;
        this.level = 1; //start to level 1?
        this.experience = 0;
        this.stats = 
        {
            hp:hp,
            mp:mp,
            strenght:strenght,
            constitution:constitution,
            intelligence:intelligence,
            speed:speed,
            fortune:fortune,
            movement:3,
        }
        this.equip =
        {//save with ID
            weapon:1,
            armor:1,
            acc1:1,
            acc2:2,
        };
        this.weakness = new Weakness(1,1,1,1,1,1,1,1)
        //resistence of status and elements non present in non battle
        this.abilities=abilities; //save with ID (pos in array)
        this.spells=spells;
    }
}

const listAllies = 
[
    {// 0
        ...new Ally("Pigna",0,100,10,10,10,10,20,10,[],[]),
    },
    {// 0
        ...new Ally("Villano",3,100,10,10,10,10,10,10,[],[]),
    },
    {// 0
        ...new Ally("Axy",5,120,13,11,15,23,12,11,[],[]),
    },
]

export {listAllies}
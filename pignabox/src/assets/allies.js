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
            weapon:0,
            armor:0,
            acc1:0,
            acc2:0,
        };
        //resistence of status and elements non present in non battle
        this.abilities=abilities; //save with ID (pos in array)
        this.spells=spells;
    }
}

const listAllies = 
[
    {// 0
        ...new Ally("Pigna",0,100,10,10,10,10,10,10,[],[]),
    }
]

export {listAllies}
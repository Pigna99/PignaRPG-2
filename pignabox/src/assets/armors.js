import { Weakness } from "./classes";
class Armor{
    constructor(name, constitution){
        this.name = name;
        this.strenght = 0;
        this.constitution = constitution;
        this.hp = 0;
        this.mp = 0;
        this.intelligence = 0;
        this.speed = 0;
        this.fortune = 0;
        this.movement = 0;
        this.weakness = new Weakness(1,1,1,1,1,1,1,1)
    }    
}


const listArmors = 
[
    {//0
        ...new Armor("none", 0)
    },
    {//1
        ...new Armor("Broken Shirt", 3) //speed?
    }
];

export {listArmors}
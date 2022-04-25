class Armor{
    constructor(name, constitution){
        this.name = name;
        this.constitution = constitution;
        this.hp = 0;
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
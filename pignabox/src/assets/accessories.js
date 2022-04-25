class Accessory { //some stats (see also weakness)
    constructor(name){
        this.name = name;
        this.strenght = 0;
        this.constitution = 0;
        this.hp = 0;
        this.mp = 0;
        this.intelligence = 0;
        this.speed = 0;
        this.fortune = 0;
        this.movement = 0;
        this.weakness = {}
    }    
}

//remember to set the description of each object!
const listAccessories = 
[
    {//0
        ...(new Accessory("none"))
    },
    {//1
        ...(new Accessory("Wooden Ring")), strenght: 3,
    },
];

export {listAccessories}
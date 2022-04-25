class Weapon{
    constructor(name, type, strenght){
        this.name = name;
        this.type = type;
        this.strenght = strenght;
        this.accuracy = 255; //it always hit
        this.speed = 0;//speed malus/bonus?
    }
}


const listWeapons = 
[
    {//0
        ...new Weapon("none", "sword", 0) //hands like sword!
    },
    {//1
        ...new Weapon("Stick", "sword", 3) //accuracy?
    }
];


export {listWeapons}
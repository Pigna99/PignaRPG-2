import { Weakness } from "./classes";

class Weapon{
    constructor(name, type, strenght, speed){
        this.name = name;
        this.type = type;
        this.strenght = strenght;
        this.accuracy = 255;
        this.constitution = 0;
        this.hp = 0;
        this.mp = 0;
        this.intelligence = 0;
        this.speed = speed;
        this.fortune = 0;
        this.movement = 0;
        this.weakness = new Weakness(1,1,1,1,1,1,1,1)//different way to set weakness?
    }
}


const listWeapons = 
[
    {//0
        ...new Weapon("none", "sword", 0, 0) //hands like sword!
    },
    {//1
        ...new Weapon("Stick", "sword", 5, 0) //accuracy?
    }
];


export {listWeapons}
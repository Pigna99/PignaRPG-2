class Weakness{
    constructor(fire,water,ice,air,slow,blind,mute,poison){
        this.elements={
            fire: fire, water: water, ice: ice, air: air
        }
        this.status={
            slow: slow, blind: blind, mute: mute, poison: poison,
        }
    }        
};
//elements:
//-1 absorp full
//0 nullifies-damage
//1 normal-damage
//2 double-damage (weak)

//status:
//1 weak
//0.5 resistent
//0 not work


export {Weakness}
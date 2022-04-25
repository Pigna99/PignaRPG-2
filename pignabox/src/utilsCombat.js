import { listWeapons, listArmors, listEnemies } from "./assets";

let ally =
        {
            stats://stats modified in combat
            {
                hp_max:100,
                hp:100,
                mp_max:10,
                mp:10,
                strenght:10,
                constitution:10,
                intelligence:10,
                speed:10,
                fortune:10,
                movement:3,
            },

        }
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

class combatEntity{
    constructor(oldstats ,id, team, weapon_type){
        this.static = oldstats;
        this.id = id;
        this.team = team;
        this.weapon_type= weapon_type
        this.weakness = new Weakness(0,0,0,0,0,0,0,0)
        this.stats = 
        {
            ...oldstats.stats,
            hp_max:oldstats.stats.hp,
            mp_max:oldstats.stats.mp,
        }
    }
}



//import weapons, armors and accessories

//

const generateCombatEntities = (allies, enemies)=>{
    let entitiesBattle = [];
    let num_entities = 0;
    allies.forEach((element) => {
        console.log(element)
        let entity = new combatEntity(element, num_entities, "a", listWeapons[element.equip.weapon].type)
        //weapon

        //armor

        //acc1

        //acc2
        
        entitiesBattle.push(entity)
        num_entities++
    });

    console.log(entitiesBattle)
    return entitiesBattle;
}


export {generateCombatEntities}
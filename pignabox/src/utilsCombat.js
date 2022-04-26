import { listWeapons, listArmors, listEnemies, listAccessories } from "./assets";


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
        console.log(element, listWeapons[element.equip.weapon], listArmors[element.equip.armor], listAccessories[element.equip.acc1], listAccessories[element.equip.acc2])
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
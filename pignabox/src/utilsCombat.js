import { listWeapons, listArmors, listEnemies, listAccessories } from "./assets";
class combatEntity{
    constructor(oldstats ,id, team, weapon_type, accuracy){
        this.static = oldstats;
        this.id = id;
        this.team = team;
        this.weapon_type= weapon_type
        this.weakness = oldstats.weakness;//to update due to accessories
        this.stats = //to update due to weapon and armor
        {
            ...oldstats.stats,
            hp_max:oldstats.stats.hp,
            mp_max:oldstats.stats.mp,
            down:false,//to see if the ally is alive
            //for enemies, they will just be removed from the array of entities
        }
        this.accuracy= accuracy;
    }
}



//import weapons, armors and accessories

//

const generateCombatEntities = (allies, enemies)=>{
    let entitiesBattle = [];
    let num_entities = 0;
    allies.forEach((element) => {
        let entity = new combatEntity(element, num_entities, "a", listWeapons[element.equip.weapon].type, listWeapons[element.equip.weapon].accuracy)
        //weapon, armor, acc1 and acc2 are actually the same type of object
        entity = setBattleStats(entity,
            [
                listWeapons[element.equip.weapon],
                listArmors[element.equip.armor],
                listAccessories[element.equip.acc1],
                listAccessories[element.equip.acc2]
            ]);
        entitiesBattle.push(entity);
        num_entities++;
    });

    //enemies! Just an array with the ids of the enemies
    enemies.forEach((element)=>{
        let entity =  new combatEntity(element, num_entities, "b", "none",255); //typeof weapon not necessary, accuracy not necessary
        entitiesBattle.push(entity);
        num_entities++;
    })

    console.log(entitiesBattle)
    return entitiesBattle;
}



const setBattleStats = (entity, objects)=>{
    objects.forEach((el)=>{
        //stats
        Object.getOwnPropertyNames(entity.stats).forEach((stat)=>{
            entity.stats[stat] += el[stat];
        })
        //weakness
        Object.getOwnPropertyNames(entity.weakness.elements).forEach((element)=>{
            entity.weakness.elements[element] = setWeakness(entity.weakness.elements[element], el.weakness.elements[element]);
        })
        Object.getOwnPropertyNames(entity.weakness.status).forEach((stat)=>{
            entity.weakness.status[stat] = setWeakness(entity.weakness.status[stat], el.weakness.status[stat]);
        })

    })
    entity.stats.hp_max=entity.stats.hp;
    entity.stats.mp_max=entity.stats.mp;
    return entity;
}

const setWeakness = (oldval, newval)=>{
    if(oldval===1){//if is base (set also strong weakness like 2)
        return newval
    }else if(newval < oldval){//else the smaller is subwritten
        return newval
    }
    return oldval
}

export {generateCombatEntities}
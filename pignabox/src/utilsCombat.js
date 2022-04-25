import {listArmors} from './assets/armors'

console.log(listArmors)

//example ally
let entityExample = 
{
    name:"Pigna",
    type_id: 0,
    level: 1,
    experience:0,
    stats://rowstats no equip modified
    {
        hp:100,
        mp:10,
        strenght:10,
        constitution:10,
        intelligence:10,
        speed:10,
        fortune:10,
        movement:3,
    },
    equip:
    {//save with ID
        weapon:0,
        armor:0,
        acc1:0,
        acc2:0,
    },
    abilities:[], //save with ID (pos in array)
    spells:[] //save with ID (pos in array)
}
//example ally
//example enemy
let enemyExample = 
{
    name:"Frog",
    type_id: 1,
    level: 1,
    experience_given:100,
    stats://rowstats
    {
        hp:100,
        //enemies don't use mp
        strenght:10,
        constitution:10,
        intelligence:10,
        speed:10,
        fortune:10,
        movement:3,
    },
    abilities_enemy:[], //save with ID (pos in array)
    spells_enemy:[] //save with ID (pos in array)
}

let allies = [entityExample];
let enemies = [enemyExample];

//import weapons, armors and accessories

//

const generateCombatEntities = (allies, enemies)=>{
    console.log(allies)
    console.log(enemies)
    let entitiesBattle = [];
    let num_entities = 0;
    allies.forEach(element => {
        let ally =
        {
            id:num_entities,//position in array
            type_id:0,
            name:element.name, 
            team:"a",
            weapon_type:"sword",
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
            weakness:{
                elements:{
                },
                status:{
                },
            },
        }

        num_entities++
    });

    console.log(entitiesBattle)
    return entitiesBattle;
}


export {allies, enemies, generateCombatEntities}
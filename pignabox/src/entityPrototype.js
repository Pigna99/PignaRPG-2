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

let combatEntityExample = //output in battle
{
    id:0,//position in array
    type_id:0,
    name:"Pigna", 
    team:"a",
    weapon_type:"sword",
    stats://stats modified in combat
    {
        hp_max:100,
        hp:100,
        mp_max:10,
        mp:10,
        dexterity:10,
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
    position:"calculated",//for turn
    fix_movement:"",//for turn
    
}



const listAbilities= [];

const listSpells= [];

const listWeapons = [{name:"none"}];

const listArmors = [{name:"none"}];
const listAccessories = [{name:"none"}];
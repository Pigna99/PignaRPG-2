import { newMatrix } from "./utils";

import { listWeapons, listArmors, listEnemies, listAccessories } from "./assets";
class combatEntity{
    constructor(oldstats ,id, team, weapon_type, accuracy){
        this.static = oldstats;
        this.id = id;
        this.name = oldstats.name;
        this.type_id = oldstats.type_id;
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
    let num_enemies = {};
    //init array for calculate the number of each enemy
    enemies.forEach((element)=>{num_enemies[element]=0})

    enemies.forEach((element)=>{//nominate if there are more of the same entity
        let entity =  new combatEntity(listEnemies[element], num_entities, "b", "none", 255); //typeof weapon not necessary, accuracy not necessary
        num_enemies[element]++;
        if(num_enemies[element]!==1){
            if(num_enemies[element]===2){//we have to set back the prev one to 1 ("name 1")  
                entitiesBattle.forEach((elback, index)=>{
                    if(elback.name === entity.name){
                        entitiesBattle[index].name = elback.name + " 1";
                    }
                })
            }
            entity.name = entity.name+" "+num_enemies[element]; //("name 2") etc
        }
        entitiesBattle.push(entity);
        num_entities++;
    })
    console.log(num_enemies)

    //console.log(entitiesBattle)
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
    entity.stats.down = false;
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



const generateAttackMatrix= (N,M, matrix, entitiesMatrix, player, entities, type)=>{
    let appMatrix = newMatrix(N,M,0);
    let x= player.ypos; let y=player.xpos;
    appMatrix[x][y]= -1 // position of player
    //remember to set to -1 also the position of all other obj not reacheable

    //see all the 4 boxes near, and go recursive
    if(type === "sword"){//check just the near 4 nodes
        //console.log(entitiesMatrix)
        if(x+1<N){
            let right = entitiesMatrix[x+1][y];
            if(isAnEntity(right)){
                if(entities[right].team==="b"){
                    appMatrix[x+1][y]= 2;//can hit an enemy
                }else{
                    appMatrix[x+1][y]= 3;//is an ally
                }
            }else{
                appMatrix[x+1][y]= 1;//can hit but nothing
            }
        }
        if(x>0){
            let left = entitiesMatrix[x-1][y];
            if(isAnEntity(left)){
                if(entities[left].team==="b"){
                    appMatrix[x-1][y]= 2;
                }else{
                    appMatrix[x-1][y]= 3;
                }
            }else{
                appMatrix[x-1][y]= 1;
            }
        }
        if(y>0){
            let down = entitiesMatrix[x][y-1];
            if(isAnEntity(down)){
                if(entities[down].team==="b"){
                    appMatrix[x][y-1]= 2;
                }else{
                    appMatrix[x][y-1]= 3;
                }
            }else{
                appMatrix[x][y-1]= 1;
            }
        }
        if(y+1<M){
            let up = entitiesMatrix[x][y+1];
            if(isAnEntity(up)){
                if(entities[up].team==="b"){
                    appMatrix[x][y+1]= 2;
                }else{
                    appMatrix[x][y+1]= 3;
                }
            }else{
                appMatrix[x][y+1]= 1;
            }
        }
    }
   
    return appMatrix;
}

const isAnEntity= (val)=>{
    if(val> -1){
        return true
    }
    return false
}


const Dijkstra = (N,M, ypos1, xpos1, ypos2, xpos2, movementMatrix)=>{
    let fatherMatrix = newMatrix(N,M, [-1,-1]);
    fatherMatrix[xpos1][ypos1] = [-2,-2]
    let queue= [{x:xpos1,y:ypos1}];
    //console.log(movementMatrix)
    while(queue.length>0){
        let p = queue.pop()
        
        if(p.x+1<N){
            if(fatherMatrix[p.x+1][p.y][0] === -1 && movementMatrix[p.x+1][p.y]>0){
                fatherMatrix[p.x+1][p.y]= [p.x,p.y];
                if(p.x+1 === xpos2 && p.y === ypos2){
                   queue=[];
                    break;
                }else{
                    queue.unshift({x:p.x+1, y:p.y}) 
                }
            }
            
        }
        if(p.x>0){
            if(fatherMatrix[p.x-1][p.y][0]===-1 && movementMatrix[p.x-1][p.y]>0){
                fatherMatrix[p.x-1][p.y]= [p.x,p.y];
                if(p.x-1 === xpos2 && p.y === ypos2){
                    queue=[];
                    break;
                }else{
                    queue.unshift({x:p.x-1, y:p.y}) 
                }
            }
        }
        if(p.y>0){
            if(fatherMatrix[p.x][p.y-1][0]===-1 && movementMatrix[p.x][p.y-1]>0){
                fatherMatrix[p.x][p.y-1]= [p.x,p.y];
                if(p.x === xpos2 && p.y-1 === ypos2){
                    queue=[];
                    break;
                }else{
                    queue.unshift({x:p.x, y:p.y-1}) 
                }
            }
        }if(p.y+1<M){
            if(fatherMatrix[p.x][p.y+1][0]===-1 && movementMatrix[p.x][p.y+1]>0){
                fatherMatrix[p.x][p.y+1]= [p.x,p.y];
                if(p.x === xpos2 && p.y+1 === ypos2){
                    queue=[];
                    break;
                }else{
                    queue.unshift({x:p.x, y:p.y+1}) 
                }
            }
        }
    }
    //console.log(fatherMatrix)
    let steps = [[ypos2,xpos2]];
    let x = xpos2;
    let y = ypos2;
    while(fatherMatrix[x][y][0]!== -2){
        let father = fatherMatrix[x][y];
        x = father[0];
        y = father[1];
        steps.push([y,x])
    }
    //start = [xpos1,ypos1]
    //console.log(steps)
    return steps
}

export {generateCombatEntities, generateAttackMatrix, Dijkstra}
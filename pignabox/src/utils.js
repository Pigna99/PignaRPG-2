let newMatrix = (N,M, value)=>{
    let matrix= [];
    for(var i=0; i<N; i++) {
        matrix[i] = [];
        for(var j=0; j<M; j++) {
            matrix[i][j] = value;
        }
    }
    return matrix;
}

let generateContinent = (matrix, N,M)=>{
    let tiles = N*M;
    // 1/14 water
    // 1/10 trees
    let water = Math.floor(tiles/14)
    let trees = Math.floor(tiles/9)
    for(let i=0; i< water; i++){
        let x= randomNumber(N);
        let y= randomNumber(M);
        if(matrix[x][y]!==3 && x!==y!==0){//generazione acqua e sabbia
            matrix[x][y]=3;
            if(x+1<N){
                if(matrix[x+1][y]!== 3) matrix[x+1][y]=2;
                if(y+1<M){if(matrix[x+1][y+1]!== 3)matrix[x+1][y+1]=2;}
                if(y>0){if(matrix[x+1][y-1]!== 3)matrix[x+1][y-1]=2;}
            }
            if(y>0){
                if(matrix[x][y-1]!== 3)matrix[x][y-1]=2;
            }if(y+1<M){
                if(matrix[x][y+1]!== 3)matrix[x][y+1]=2;
            }
            if(x>0){
                if(matrix[x-1][y]!== 3)matrix[x-1][y]=2;
                if(y+1<M){if(matrix[x-1][y+1]!== 3)matrix[x-1][y+1]=2;}
                if(y>0){if(matrix[x-1][y-1]!== 3)matrix[x-1][y-1]=2;}
            }
        }   
    }
    for(let i=0; i< trees; i++){
        let x= randomNumber(N);
        let y= randomNumber(M);
        if(matrix[x][y]!==3 && matrix[x][y]!==2 && x!==y!==0){matrix[x][y]=4}else{i--}
    }
    return matrix;
}

let randomNumber= (n)=>{
    return Math.floor(Math.random()*n);
}

let generateMovementMatrix= (N,M,matrix, entitiesMatrix, player, mov)=>{
    let appMatrix = newMatrix(N,M,0);
    let x= player.ypos; let y=player.xpos;
    appMatrix[x][y]= -1 // position of player
    //remember to set to -1 also the position of all other obj not reacheable

    //see all the 4 boxes near, and go recursive
    let queue= [{x,y,mov}];
    while(queue.length>0){
        let p = queue.pop()

        if(p.x+1<N){
            if(appMatrix[p.x+1][p.y]===0 && p.mov>0 ){
                if(isReachable(matrix[p.x+1][p.y]) && notOtherEntities(entitiesMatrix[p.x+1][p.y])){
                    appMatrix[p.x+1][p.y]=p.mov;
                    queue.unshift({x:p.x+1, y:p.y, mov:p.mov-1})     
                }else{
                    appMatrix[p.x+1][p.y]=-1;
                }
            }
        }
        if(p.x>0){
            if(appMatrix[p.x-1][p.y]===0 && p.mov>0){
                if(isReachable(matrix[p.x-1][p.y]) && notOtherEntities(entitiesMatrix[p.x-1][p.y])){
                    appMatrix[p.x-1][p.y]=p.mov;
                    queue.unshift({x:p.x-1, y:p.y, mov:p.mov-1})     
                }else{
                    appMatrix[p.x-1][p.y]=-1;
                }
            }
        }
        if(p.y>0){
            if(appMatrix[p.x][p.y-1]===0 && p.mov>0){
                if(isReachable(matrix[p.x][p.y-1]) && notOtherEntities(entitiesMatrix[p.x][p.y-1])){
                    appMatrix[p.x][p.y-1]=p.mov;
                    queue.unshift({x:p.x, y:p.y-1, mov:p.mov-1})     
                }else{
                    appMatrix[p.x][p.y-1]=-1;
                }
            }
        }if(p.y+1<M){
            if(appMatrix[p.x][p.y+1]===0 && p.mov>0){
                if(isReachable(matrix[p.x][p.y+1]) && notOtherEntities(entitiesMatrix[p.x][p.y+1])){
                    appMatrix[p.x][p.y+1]=p.mov;
                    queue.unshift({x:p.x, y:p.y+1, mov:p.mov-1})     
                }else{
                    appMatrix[p.x][p.y+1]=-1;
                }
            }
        }
    }
   
    return appMatrix;
}

let isReachable= (el)=>{
    if(el!==3 && el!==4){
        return true
    }
    return false
}

let notOtherEntities= (el)=>{
    if(el===-1){
        return true
    }
    return false
}


const setMouse = (x,y)=>{
    let center = 15;
    if(x>center && y>center){return "se-resize"}
    else if(x<-center && y>center){return "sw-resize"}
    else if(x>center && y<-center){return "ne-resize"}
    else if(x<-center && y<-center){return "nw-resize"}
    else if(-center<= x <= center && y>=center){return "s-resize"}
    else if(-center<= y <= center && x<=-center){return "e-resize"}
    else if(-center<= x <= center && y<=-center){return "n-resize"}
    else if(-center<= y <= center && x>=center){return "w-resize"}
    else{return "all-scroll"}
  }




//generate prio queue

const generatePrioQueue = (entities, prioLength)=>{
    //select the first one in combat
    let first_id = 0;
    let first_initiative = 0;
    let prioEntities = [];
    entities.forEach((element,id,array) => {
        let initiative = Math.random()*10*Math.log(element.stats.fortune);//problems with this random!
        //console.log(initiative)
        if(initiative> first_initiative){
            first_id=id;
            first_initiative=parseInt(initiative)
        }
        //also calculate the speed impact
        array[id].speed_prio = calculateSpeedPrio(element.stats.speed)
        //console.log(id, array[id].speed_prio)
        array[id].position = parseInt(array[id].speed_prio/(1+Math.random()));

        prioEntities.push({team:element.team, name:element.name,id: element.id, last_position: array[id].position, speed_prio:array[id].speed_prio})
    });
    //console.log("First turn: "+entities[first_id].name);
    //console.log(entities)
    entities[first_id].position= 0;//the first turn holder!

    prioEntities.forEach((el,index)=>{//set also in the prio queue
        if(el.id === entities[first_id].id){
            prioEntities[index].position = 0;
        }
    })

    let queue = []//the queue of turns
    let turn = first_id;
    for(let i=0; i<prioLength; i++){   
        for(let n=0; n< entities.length; n++){//search for min
            if (entities[n].position< entities[turn].position){
                turn = n;
            }
        }
        //turn is the next to insert to queue and increment
        queue.push({id: entities[turn].id, name:entities[turn].name, position: entities[turn].position, speed_prio: entities[turn].speed_prio, team: entities[turn].team})
        prioEntities.forEach((el,index)=>{
            if(el.id === entities[turn].id){
                prioEntities[index].last_position = entities[turn].position;
            }
        })
        entities[turn].position += entities[turn].speed_prio;
        
    }
    //console.log(queue)
    //now generate the queue of prio and also the pointer of last prio
    return [queue, prioEntities];
}


const nextTurn= (queue, prioEntities) =>{
    //get the last priority
    let last_prio = queue[queue.length-1].position;//the queue is used only for get the last position
    queue.shift(); //remove the first one

    //console.log(queue)
    let min = -1;
    prioEntities.forEach((el, index)=>{
        if(el.last_position + el.speed_prio>= last_prio){//found one next turn
            if(min === -1){
                min = index
            }else{
                if(el.last_position + el.speed_prio <= (prioEntities[min].last_position+prioEntities[min].speed_prio)){
                    min = index
                }
            }
        }
    })

    queue.push({...prioEntities[min], position: prioEntities[min].last_position+prioEntities[min].speed_prio})
    prioEntities[min].last_position = prioEntities[min].last_position+prioEntities[min].speed_prio;
    return [queue, prioEntities];
}

const recalcQueue = ()=>{
    //if an enemy/ally dies/revive 

}


const calculateSpeedPrio= (speed)=>{
    return parseInt((256- (255*calculateLog(speed, 255)))) 
}

const calculateLog= (n,b)=>{
    return Math.log(n)/Math.log(b)
}
//generate prio queue


const getEnemyPos = (N,M, matrix, entitiesMatrix, oldenemies)=>{
    let position = {x:0,y:0};
    let x=0; let y=0;
    do{
        x= randomNumber(N);
        y= randomNumber(M);
        
    }while((matrix[x][y]=== 3 || matrix[x][y]=== 4) || entitiesMatrix[x][y]!==-1 || seeForOldEnemies(oldenemies, x, y))
    position.x=x;
    position.y=y;
    //console.log(position)
    return position
}

const seeForOldEnemies = ( oldenemies, x, y)=>{
    let exit = false;
    oldenemies.forEach(element => {
        if(element.xpos=== y && element.ypos ===x){
            console.log("CIAOO!")
            exit = true
        }
    });
    return exit
}


const generateEntitiesMatrix = (N , M, entities, matrix)=>{
    let initmatrix = newMatrix(N,M, -1);
    //console.log(entities,matrix, initmatrix)
    let entitiesPos = []
    //displacement used for the position of the teams
    let displacementx = Math.floor(N/2) 
    let displacementy = Math.floor(M/2)
    entities.forEach((entity, index)=>{
        let ent={};
        let x=0; let y=0;
        do{
            if(entity.team==="a"){ //quadrant n/2 * m/2 (floor)
                x= randomNumber(displacementx);
                y= randomNumber(displacementy);
            }else if(entity.team==="b"){ //opposite quadrant of team a
                x= N - 1 - randomNumber(displacementx);
                y= M - 1 - randomNumber(displacementy);
            }
        }while((matrix[x][y]=== 3 || matrix[x][y]=== 4) || initmatrix[x][y]!==-1)
        initmatrix[x][y]=entity.id;
        ent.id = entity.id;
        ent.xpos = y;
        ent.ypos = x;
        entitiesPos.push(ent)
    })
    //console.log(initmatrix)
    return [initmatrix, entitiesPos]
}

export {newMatrix, generateContinent, generateMovementMatrix, setMouse, generatePrioQueue, nextTurn, getEnemyPos, generateEntitiesMatrix}
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

let generateMovementMatrix= (N,M,matrix, player, mov)=>{
    let appMatrix = newMatrix(N,M,0);
    let x= player.ypos; let y=player.xpos;
    appMatrix[x][y]= -1 // position of player
    //remember to set to -1 also the position of all other obj not reacheable

    //see all the 4 boxes near, and go recursive
    let queue= [{x,y,mov}];
    while(queue.length>0){
        let p = queue.pop()

        if(p.x+1<N){
            if(appMatrix[p.x+1][p.y]===0 && p.mov>0){
                if(isReachable(matrix[p.x+1][p.y]) ){
                    appMatrix[p.x+1][p.y]=p.mov;
                    queue.unshift({x:p.x+1, y:p.y, mov:p.mov-1})     
                }else{
                    appMatrix[p.x+1][p.y]=-1;
                }
            }
        }
        if(p.x>0){
            if(appMatrix[p.x-1][p.y]===0 && p.mov>0){
                if(isReachable(matrix[p.x-1][p.y]) ){
                    appMatrix[p.x-1][p.y]=p.mov;
                    queue.unshift({x:p.x-1, y:p.y, mov:p.mov-1})     
                }else{
                    appMatrix[p.x-1][p.y]=-1;
                }
            }
        }
        if(p.y>0){
            if(appMatrix[p.x][p.y-1]===0 && p.mov>0){
                if(isReachable(matrix[p.x][p.y-1]) ){
                    appMatrix[p.x][p.y-1]=p.mov;
                    queue.unshift({x:p.x, y:p.y-1, mov:p.mov-1})     
                }else{
                    appMatrix[p.x][p.y-1]=-1;
                }
            }
        }if(p.y+1<M){
            if(appMatrix[p.x][p.y+1]===0 && p.mov>0){
                if(isReachable(matrix[p.x][p.y+1]) ){
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


export {newMatrix, generateContinent, generateMovementMatrix, setMouse}
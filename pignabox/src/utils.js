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
        if(matrix[x][y]!==3){//generazione acqua e sabbia
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
        if(matrix[x][y]!==3 && matrix[x][y]!==2){matrix[x][y]=4}else{i--}
    }
    return matrix;
}

let randomNumber= (n)=>{
    return Math.floor(Math.random()*n);
}

export {newMatrix, generateContinent}
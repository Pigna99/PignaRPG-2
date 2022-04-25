import {React, useState, useEffect, createContext, useContext} from 'react'

const NO_ROTATION = {x:70,y:0,z:0}
const START_ROTATION = {x:50,y:0,z:310}


const CameraContext = createContext()
const CameraProvider = ({children})=>{
    //rotation
    const [scaling, setScaling] =useState(50);
    const [rotationFull, setRotationFull] = useState(NO_ROTATION)
    const [zindex, setZindex] = useState(0);
    const [perspective, setPerspective] =useState(false);
    //mov
    const [isCameraMoving, setIsCameraMoving] = useState(false);
    const [cameraMovingStart, setCameraMovingStart] = useState([0,0]);
 
    const [movingOffset, setMovingOffset] = useState([0,0])
    const [movingAxes, setMovingAxes] = useState([0,0])
    //mov

    //animation
    const [firstAnimation, setFirstAnimation] = useState(true)
    //animation

    const handleZoom= (type) =>{
        if(type === "in" && scaling<100){
            setScaling(scaling+10)
        }else if(type === "out" && scaling>5){
            setScaling(scaling-10)
        }
    }

    const handleScaling= (event) =>{
        setScaling(event.target.value);
    }

    const handleZindex= (event) =>{
        setZindex(event.target.value);
    }

    const setPerspectiveUp= ()=>{
        setRotationFull({x:0,y:0,z:360});
        //setPerspective(true);
    }

    const setPerspectiveNormal= ()=>{
        setRotationFull(START_ROTATION);
        //setPerspective(false);
    }

    const setPerspectiveReverse= ()=>{
        setRotationFull({x:60,y:0,z:130});
        //setPerspective(false);
    }
    const rotateZ= (angle)=>{
        let newAngle = rotationFull.z+angle;
        setRotationFull({...rotationFull,z:newAngle});
        newAngle= newAngle%360;
    }

    const setFullScreen= ()=>{
        document.body.requestFullscreen();
    }

    let handleRotationFullX = (event) =>{
        setRotationFull({...rotationFull, x:event.target.value});
    }
    let handleRotationFullY = (event) =>{
        setRotationFull({...rotationFull, y:event.target.value});
    }
    let handleRotationFullZ = (event) =>{
        setRotationFull({...rotationFull, z:event.target.value});
    }

    

    const handleCameraMovement= (e)=>{
        if (e.nativeEvent.button === 2) {
            //console.log('Right click');
            setCameraMovingStart([e.pageX, e.pageY])
            setIsCameraMoving(true)
            //show the point!
        }
    }
    

    const handleCameraStop= (e)=>{
        //if (e.nativeEvent.button === 2) {
            //console.log('Right click stop');
            setIsCameraMoving(false)
            setMovingOffset([0,0])
        //}
    }

    const handleCamera= (e)=>{
        //clearInterval(movingTimeout)
        //console.log("START FROM "+cameraMovingStart[0]+" "+cameraMovingStart[1])
        let offsetX = setRange(cameraMovingStart[0]-e.pageX, 100);
        let offsetY = setRange(cameraMovingStart[1]-e.pageY, 100);
        //let offset = setRangeCircle(cameraMovingStart[0]-e.pageX, cameraMovingStart[1]-e.pageY, 100)
        //console.log(offsetX, offsetY)
        setMovingAxes([movingAxes[0]+offsetX/10, movingAxes[1]+offsetY/10])
        setMovingOffset([offsetX,offsetY])
        //setMovingAxes([movingAxes[0]+offset[0]/10, movingAxes[1]+offset[1]/10])
        //setMovingOffset([offset[0],offset[1]])
        //setMovingTimeout(setInterval((cameraMovingStart)=>{console.log("CIAO");setMovingAxes([movingAxes[0]+offsetX/10, movingAxes[1]+offsetY/10])
        //},100))
    }


    const setRange= (value, maxmin)=>{
        if(value>maxmin)return maxmin
        else if (value<-maxmin)return -maxmin
        else return value
    }

    const setRangeCircle= (valuex, valuey, maxmin)=>{//radius < maxmin
        let radius = Math.sqrt(valuex^2 + valuey^2)
        if(radius>maxmin)return [valuex, valuey]
        else{
            let k = maxmin/radius;
            return [valuex*k, valuey*k]
        }
    }

    useEffect(()=>{
        //console.log(rotationFull)
        if(rotationFull.x<20 || rotationFull.x>340){
            setPerspective(true)
        }else{
            setPerspective(false)
        }
    },[rotationFull])

    useEffect(()=>{
        if(isCameraMoving){
        let i=0;
        const interval = setInterval(() => {
            //console.log(movingAxes)
            setMovingAxes([movingAxes[0]+(i*movingOffset[0])/10, movingAxes[1]+(i*movingOffset[1])/10])
            i++
            //console.log("CIAO!")
          }, 30);
        
        return () => clearInterval(interval);
        }
    },[movingOffset, isCameraMoving])

    useEffect(()=>{
        
        setTimeout(()=>{
            setRotationFull(START_ROTATION)
            
        },1)
        setTimeout(()=>{
            setFirstAnimation(false)
        },100)
    }, [])

    return <CameraContext.Provider value={{
        setPerspectiveUp, perspective, setPerspectiveNormal,
        scaling, handleScaling, rotationFull, handleRotationFullX,handleRotationFullY,handleRotationFullZ,
        setPerspectiveReverse,handleZindex, zindex, setFullScreen,
        rotateZ, handleZoom, handleCameraMovement, handleCameraStop,
        handleCamera, isCameraMoving, movingAxes, cameraMovingStart, movingOffset,
        firstAnimation
    }}>
        {children}
    </CameraContext.Provider>
}

const useCameraContext = ()=>{
    return useContext(CameraContext)
}

export {CameraProvider, useCameraContext}
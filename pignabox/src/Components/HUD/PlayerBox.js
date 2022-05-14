import React from 'react'
import { usePlayerContext, useBoardContext } from '../../contexts'

function PlayerBox() {
    const {setPlayerReady,playerStatus} = usePlayerContext()
    const {entities, entitiesPos, activeEntity} = useBoardContext()
  return (
    <div className='playerbox'>
        <h3>Player Box</h3>
        {
            entities.map(el => {
                if(el.team==="b"){return ""}//if enemy exit
                console.log(el)
                return <PlayerInfo player={el} key={el.name + "info"}
                    active={activeEntity.id===el.id}
                />
            })
        }
    </div>
  )
}

const PlayerInfo = ({player,active}) =>{
    return(
        <div style={{height:"50px",width:active ? "100%" : "90%", border:"2px solid white",
            backgroundColor: active ? "rgba(0, 0, 108, 0.4)" : "",
            transition:"all 0.3s",
            display:"flex", alignItems:"center"
        }}>
            <h4 style={{marginLeft:10, width:"120px"}}>{player.name}</h4>
            <InfoBox hp={player.stats.hp} hp_max={player.stats.hp_max}
              mp={player.stats.mp} mp_max={player.stats.mp_max}/>
        </div>
    )
}

const InfoBox = ({hp, hp_max, mp, mp_max, status})=>{
    return(
      <div style={{width:"100%"}}>
        <div>
            <div style={{position:"relative",zIndex:1}}>{`${hp} / ${hp_max}`}</div>
            <div style={{
                width:`${(hp/hp_max)*100}%`, height:"18px",
                backgroundColor:"red", position:"relative",
                marginBottom:-15,top:-15, zIndex:0,
                transition:"all 0.3s"
            }}/>
        </div>
        <div className='mpbar'>
            <div style={{position:"relative",zIndex:1}}>{`${mp} / ${mp_max}`}</div>
            <div style={{
                width:`${(mp/mp_max)*100}%`, height:"18px",
                backgroundColor:"cyan",position:"relative",
                marginBottom:-15,top:-15, zIndex:0,
                transition:"all 0.3s"
            }}/>
            </div>
      </div>
    )
  }

export default PlayerBox
import React from 'react'
import { usePlayerContext, useBoardContext } from '../../contexts'

function PlayerBox() {
    //const {setPlayerReady,playerStatus} = usePlayerContext()
    const {entities, activeEntity} = useBoardContext()
  return (
    <div className='playerbox'>
        {
            entities.map(el => {
                if(el.team==="b"){return ""}//if enemy exit
                return <PlayerInfo player={el} key={el.name + "info"}
                    active={activeEntity.id===el.id}
                />
            })
        }
        <ActionsBox/>
    </div>
  )
}

const ActionsBox = ()=>{
    const {playerMove, setPlayerAttack, setPlayerMoving, setPlayerItems, setPlayerAbilities, setPlayerSpells,} = usePlayerContext()
    const {activeEntity, setNextTurn} = useBoardContext()
    return(
    <div style={{display:"flex"}}>
        <div style={{display:"flex", flexFlow:"column", width:"30%"}} className="optionsmenu">
            <button onClick={setPlayerMoving} style={{backgroundColor:activeEntity.team === "a" ? (playerMove === "MOVE" ? "red" : ""):""}}>move</button>
            <button onClick={setPlayerAttack} style={{backgroundColor:activeEntity.team === "a" ? (playerMove === "ATTACK" ? "red" : ""):""}}>attack</button>
            <button onClick={setPlayerSpells} style={{backgroundColor:activeEntity.team === "a" ? (playerMove === "SPELLS" ? "red" : ""):""}}>magic</button>
            <button onClick={setPlayerAbilities} style={{backgroundColor:activeEntity.team === "a" ? (playerMove === "ABILITIES" ? "red" : ""):""}}>abilities</button>
            <button onClick={setPlayerItems} style={{backgroundColor:activeEntity.team === "a" ? (playerMove === "ITEMS" ? "red" : ""):""}}>items</button>

            <button onClick={()=>{if(activeEntity.team === "a")setNextTurn()}} style={{backgroundColor:activeEntity.team === "a" ? "blue" : ""}}>passa</button>
        </div>
        {   
            activeEntity.team === "a" ? (playerMove === "SPELLS" || playerMove === "ABILITIES" || playerMove === "ITEMS"? 
            <div style={{display:"flex", flexFlow:"column", width:"68%",height:"125px", backgroundColor:"rgba(0, 0, 108, 0.4)"}}>
                menu
            </div> : ""): ""
            
        }
        
     </div>)
  }

const PlayerInfo = ({player,active}) =>{
    return(
        <div style={{height:"50px",width:active ? "97%" : "90%", border:"2px solid white",
            backgroundColor: active ? "rgba(0, 0, 108, 0.4)" : "rgba(12, 185, 208, 0.4)",
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
            <div style={{position:"relative",zIndex:1, textAlign:"center"}}>{`${hp} / ${hp_max}`}</div>
            <div style={{
                width:`${(hp/hp_max)*100}%`, height:"18px",
                backgroundColor:"red", position:"relative",
                marginBottom:-15,top:-15, zIndex:0,
                transition:"all 0.3s"
            }}/>
        </div>
        <div className='mpbar'>
            <div style={{position:"relative",zIndex:1, textAlign:"center"}}>{`${mp} / ${mp_max}`}</div>
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
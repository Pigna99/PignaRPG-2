import React from 'react'
import Prop from './Prop';
import { useGlobalContext } from '../context'
import playerimg from '../img/ralsei.webp'
const DIM= 104;

function Player() {
    const {player, move} = useGlobalContext()

  return (
      <Prop className={'player'} onKeyDown={move} tabIndex={0} img={playerimg} xpos={player.xpos} ypos={player.ypos}/>
  )
}

export default Player
import React from 'react';
import pokeball from '../assets/pokeball.svg'
import star from '../assets/star.svg';
import shiny from '../assets/shiny.svg';
import bingoBall from '../assets/goldPokeball.svg'
import { dexDataMap } from '../util/dexData';

const Square = ({base,src,id,capture,setCapture,isShiny,bingo,delay}) => {
    function findDex(name){
        let inData = dexDataMap.get(name);
        if(!inData) return "999"
        return inData.dex;

    }
    return (
        <div className="h-full w-full relative">
        <img onClick={()=>setCapture(!capture,id)} className={`p-4 h-full w-full border-2 border-gray-500 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40  rounded`} src={`${base}${findDex(src)}.png`} alt={src} />
        {capture &&     
        <div onClick={()=>setCapture(!capture,id)}  className={`flex ${bingo? 'hidden':''} z-10 absolute top-0 left-0 justify-center items-center h-full w-full`}>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-0 absolute bottom-2/3 left-[50%-4px] animate-fall' src={star} alt='star'></img>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-0 absolute bottom-2/3 left-1/4  animate-fallLeft' src={star} alt='star'></img>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-0 absolute bottom-2/3 right-1/4 animate-fallRight' src={star} alt='star'></img>
          <img className='h-1/2 w-1/2 opacity-60 animate-catch' src={pokeball} alt='pokeball'/>
        </div>

        }
        {capture &&     
        <div onClick={()=>setCapture(!capture,id)}  className={`flex ${bingo? '':'hidden'} z-10 absolute top-0 left-0 justify-center items-center h-full w-full`}>
          <img className={`h-1/2 w-1/2 opacity-60 ${delay} animate-bingo`} src={bingoBall} alt='bingo'></img>
        </div>
        }
        {isShiny && <div onClick={()=>setCapture(!capture,id)}  className='flex z-10 absolute top-0 left-0 justify-center items-center h-full w-full'>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-1 absolute bottom-[75%] left-1/2 animate-shinyDelay' src={shiny} alt='shiny'></img>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-1 absolute bottom-1/3 left-[20%]  animate-shinyRight' src={shiny} alt='shiny'></img>
          <img className='sm:h-4 sm:w-4 h-2 w-2 absolute bottom-1/4 right-1/4 animate-shiny' src={shiny} alt='shiny'></img>            
        </div>
        }
        </div> 
    );
}
 
export default Square;
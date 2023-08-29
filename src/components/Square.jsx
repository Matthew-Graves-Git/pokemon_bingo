import React from 'react';
import pokeball from '../assets/pokeball.svg'
import star from '../assets/star.svg';
import { dexDataMap } from '../util/dexData';

const Square = ({base,src,id,capture,setCapture,isShiny}) => {
    function findDex(name){
        let inData = dexDataMap.get(name);
        if(!inData) return "999"
        return inData.dex;

    }
    const border = isShiny ? 'border-yellow-400' :'border-gray-500' 
    return (
        <div className="h-full w-full relative">
        <img onClick={()=>setCapture(!capture,id)} className={`p-4 h-full w-full border-2 ${border} bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40  rounded`} src={`${base}${findDex(src)}.png`} alt={src} />
        {capture &&     
        <div onClick={()=>setCapture(!capture,id)}  className='flex z-10 absolute top-0 left-0 justify-center items-center h-full w-full'>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-0 absolute bottom-2/3 left-[50%-4px] animate-fall' src={star} alt='star'></img>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-0 absolute bottom-2/3 left-1/4  animate-fallLeft' src={star} alt='star'></img>
          <img className='sm:h-4 sm:w-4 h-2 w-2 opacity-0 absolute bottom-2/3 right-1/4 animate-fallRight' src={star} alt='star'></img>
          <img className='h-1/2 w-1/2 opacity-60 animate-catch' src={pokeball} alt='pokeball'>
            
          </img>
        </div>
        }
        </div> 
    );
}
 
export default Square;
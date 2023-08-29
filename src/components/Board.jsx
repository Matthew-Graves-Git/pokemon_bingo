import React, { useState, useEffect, useRef } from 'react';
import { encounterData } from '../util/encounterData';
import background from '../assets/pokeball-background.svg'
import { dexDataMap } from '../util/dexData';
import {BsDice4} from 'react-icons/bs'
import Square from './Square';
const Board = ({options,filters}) => {
    const [squares, setSquares] = useState([]);
    const generateNum = (min,max) => {return Math.floor((Math.random() * max) + min)}
    const base = 'https://www.serebii.net/scarletviolet/pokemon/new/';
    const shiny = 'https://www.serebii.net/Shiny/SV/new/'
    const ref =  useRef(null)
    
    const filterData = () =>{
        if(!filters) return null;
        let temp = encounterData.filter((pokemon)=> {return pokemon.version.includes(filters.version)})
        if(filters.area) temp = temp.filter((pokemon)=> {
            for (let index = 0; index < pokemon.area.length; index++) {
                if(pokemon.area[index].province === filters.area)return true
            }
            return false
        })
        if(filters.encounter !== -1) temp = temp.filter((pokemon)=> {return pokemon.encounter <= filters.encounter})
        
        if(filters.type){
            temp = temp.filter((pokemon)=> {
                let dex = dexDataMap.get(pokemon.name)
                if(!dex) return false
                return  filters.type.includes(dex.type1) || filters.type.includes(dex.type2)
            })
        }
        console.log(temp)
        return temp;
    }
    const reRoll = () =>{
        const temp = []
        let newElement;
        const filteredData = filterData()
        for (let index = 0; index < 25; index++) {
            newElement = filteredData[generateNum(0,filteredData.length)]
            if(filteredData.length >= 25){
                while (temp.includes(newElement)) newElement = filteredData[generateNum(0,filteredData.length)]
            }
            temp[index] = newElement
        }
        ref.current = shinyValue()
        setSquares(temp)
        options.resetCard()
    }
    const animateReRoll = async () => {
        for (let index = 0; index < 6; index++) {
            reRoll()
            await delay(200)
        }
    }
    const shinyValue =  () => {
        return generateNum(0,options.shiny)
    }
    function delay(ms) {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      
    }
    useEffect(() => {
        ref.current = shinyValue()
         reRoll()
    }, []);
    return (
    <main className='flex items-center lg:flex-row flex-col justify-center relative  h-full w-screen mt-2'>
        <section className='grid grid-cols-5 lg:w-[max(35%,600px)] w-[max(80%,400px)]'>
            {squares && squares.map((item,index)=>{
                if(ref.current === index) return <Square key={index} src={item.name} base={shiny} isShiny={true} capture={options.card[index]} setCapture={options.setCatch} id={index}/>
                return <Square key={index} src={item.name} base={base} isShiny={false} capture={options.card[index]} setCapture={options.setCatch} id={index}/>
            })}
            
            
        </section>
        <img className='absolute -z-10 -right-1/4 bottom-0 opacity-10 h-2/3 w-2/3 rotate-12' src={background} alt="Background"/>
        <button className='fade-left w-fit h-fit lg:absolute xl:right-[22%] lg:right-[15%] bottom-0 right-4 p-2 my-3 
                            flex items-center rounded-full
                            text-white
                            bg-red-400 cursor-pointer' onClick={()=>animateReRoll()}><BsDice4 size={30}/></button>
    </main>
    );
}
 
export default Board;
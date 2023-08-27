import React, { useState, useEffect } from 'react';
import { encounterData } from '../util/encounterData';
import { dexDataMap } from '../util/dexData';
import Square from './Square';
const Board = ({options,filters}) => {
    const [squares, setSquares] = useState([]);
    const generateNum = (min,max) => {return Math.floor((Math.random() * max) + min)}
    const base = 'https://www.serebii.net/scarletviolet/pokemon/new/';
    
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
                return dex.type1 === filters.type || dex.type2 === filters.type
            })
        }
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
        setSquares(temp)
        options.resetCard()
    }
    const animateReRoll = async () => {
        for (let index = 0; index < 10; index++) {
            reRoll()
            await delay(200)
        }
    }
    function delay(ms) {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      
    }
    useEffect(() => {
         reRoll()
    }, []);
    return (
    <main className='flex items-center justify-center bg-white h-screen w-screen'>
        <section className='grid grid-cols-5 lg:w-[max(35%,600px)] w-[max(80%,500px)]'>
            {squares && squares.map((item,index)=>{
                return <Square key={index} src={item.name} base={base} capture={options.card[index]} setCapture={options.setCatch} id={index}/>
            })}
            <button className='fade-left w-fit h-20 px-6 py-3 my-3 
                            flex items-center rounded-md 
                            text-white
                            bg-red-500 cursor-pointer' onClick={()=>animateReRoll()}>reroll</button>
            
        </section>
    </main>
    );
}
 
export default Board;
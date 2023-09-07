import React, { useState, useEffect, useMemo } from 'react';
import Board from './Board';
import Sidebar from './SideBar';
import Navbar from './Navbar';


const Game = () => {
    const socket = useMemo(()=>new WebSocket("ws://192.168.1.65:443"),[]);
    const [card, setCard] = useState([]);
    const [bingo, setBingo] = useState([]);
    const [playerCards, setPlayerCards] = useState({});
    const [version, setVersion] = useState("Violet");
    const [encounter, setEncounter] = useState(100);
    const [type, setType] = useState(null);
    const [area, setArea] = useState('');
    const [shiny, setShiny] = useState(128);

    const filterData = {version,encounter,type,area}
    const filterEdit = {setVersion,setEncounter,setType,setArea}

    const resetCard = () => {
        const temp = []
        for (let index = 0; index < 25; index++) {
            temp[index] = false
        }
        if(socket.readyState)socket.send(temp)
        setCard(temp)
        setBingo(temp)
    }

    const setCatch = (state,index) => {
        const temp = [...card]
        temp[index] = state
        hasBingo(temp,state,index)
        socket.send(temp)
        setCard(temp)
    }

    const hasBingo = (card,state,index) =>{
        let temp = []
        if(state){
            temp = [...bingo]      
            if(hasVerticalBingo(card,index)){
                for (let row = 0; row < 5; row++) {
                    temp[((index % 5) + row*5)] = true 
                }
            }
            if(hasHorizontalBingo(card,index)){
                for (let column = 0; column < 5; column++) {
                    temp[(((Math.floor(index / 5)) * 5) + column)] = true
                }
            }
            if(hasLeftDiagonalBingo(card,index)){
                for (let diagonal = 1; diagonal < 6; diagonal++) {
                    temp[4*diagonal]= true; 
                }
            }
            if(hasRightDiagonalBingo(card,index)){
                for (let diagonal = 0; diagonal < 5; diagonal++) {
                    temp[6*diagonal]= true; 
                }
            }
        }else{
            for (let index = 0; index < 25; index++) {
              temp[index] = false
            }
            for (let index = 0; index < 25; index++) {
                if(hasVerticalBingo(card,index)){
                    for (let row = 0; row < 5; row++) {
                        temp[((index % 5) + row*5)] = true 
                    }
                }
                if(hasHorizontalBingo(card,index)){
                    for (let column = 0; column < 5; column++) {
                        temp[(((Math.floor(index / 5)) * 5) + column)] = true
                    }
                }
                if(hasLeftDiagonalBingo(card,index)){
                    for (let diagonal = 1; diagonal < 6; diagonal++) {
                        temp[4*diagonal]= true; 
                    }
                }
                if(hasRightDiagonalBingo(card,index)){
                    for (let diagonal = 0; diagonal < 5; diagonal++) {
                        temp[6*diagonal]= true; 
                    }
                } 
            }
            
        }
        setBingo(temp)
    }
    const hasVerticalBingo = (card,index) =>{
        for (let row = 0; row < 5; row++) {
            if(!card[((index % 5) + row*5)]) return false; 
        }
        return true;
    }
    const hasHorizontalBingo = (card,index) =>{
        for (let column = 0; column < 5; column++) {
            if(!card[(((Math.floor(index / 5)) * 5) + column)]) return false; 
        } 
        return true;
    }
    const hasRightDiagonalBingo = (card,index) =>{
        if(index % 6 === 0){
            for (let diagonal = 0; diagonal < 5; diagonal++) {
                if(!card[6*diagonal]) return false 
            }
            return true
        }
        return false;
    }
    const hasLeftDiagonalBingo = (card,index) =>{
        if(index % 4 === 0){
            for (let diagonal = 1; diagonal < 6; diagonal++) {
                if(!card[4*diagonal]) return false
            }
            return true
        }
        return false
    }      
    
    useEffect(() => {
        socket.addEventListener("message", (event) => {
            const temp = event.data.split(',')
            const players = {...playerCards}
            if(temp[0] === 'delete'){
                console.log(temp[1])
                delete players[temp[1]]
            }else{
                const id = temp.pop();
                players[id] = temp;
            }
            setPlayerCards(players)
        });
    }, [playerCards,socket]);

    useEffect(() => {
        socket.addEventListener("open", (event) => {
            resetCard()
        }); 
    
    }, [socket]);
    const cache = {card,bingo,setCatch,resetCard,shiny}

    return ( 
        <div className='relative'>
        <Navbar filterData={filterData} filterEdit={filterEdit}/>
        <Board options={cache} filters={filterData}/>
        <Sidebar card={playerCards}/>
        
        </div>
     );
}
 
export default Game;
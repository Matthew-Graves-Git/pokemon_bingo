import React, { useState, useEffect, useMemo } from 'react';
import Board from './Board';
import Sidebar from './SideBar';
import Navbar from './Navbar';


const Game = () => {
    const socket = useMemo(()=>new WebSocket("ws://192.168.1.228:443"),[]);
    const [card, setCard] = useState([]);
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
    }

    const setCatch = (state,index) => {
        const temp = [...card]
        temp[index] = state
        socket.send(temp)
        setCard(temp)
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
    const cache = {card,setCatch,resetCard,shiny}

    return ( 
        <div>
        <Navbar filterData={filterData} filterEdit={filterEdit}/>
        <Board options={cache} filters={filterData}/>
        <Sidebar card={playerCards}/>
        
        </div>
     );
}
 
export default Game;
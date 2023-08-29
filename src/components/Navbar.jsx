import OptionsModal from "./OptionsModal";
import React, { useState } from 'react';
import {BsFillGearFill, BsQuestionCircleFill} from 'react-icons/bs'


const Navbar = ({filterData,filterEdit}) => {
    const [options, setOptions] = useState(false);

    return ( 
        <nav className="flex flex-col justify-center items-center z-10 w-full h-full text-white bg-gradient-to-r from-[#e6e1c4] to-[#f4f0db] px-4 ">
            <h1 className="text-4xl lg:text-6xl border-b-2 text-gray-500 border-red-400 font-semibold">Pokemon Bingo</h1>
            <ul className="flex items-center justify-start mt-1 gap-2">
                <li className="cursor-pointer w-full p-1 bg-gray-500 rounded-full" onClick={()=>{setOptions(true)}}>
                    <BsFillGearFill size={20}/>
                </li>
                <li className="cursor-pointer w-full p-1 bg-gray-500 rounded-full" onClick={()=>{setOptions(true)}}>
                    <BsQuestionCircleFill size={20}/>
                </li>
            </ul>
            <OptionsModal
                title="Options"
                isOpened={options}
                onClose={() => setOptions(false)}
                filterData = {filterData}
                filterEdit = {filterEdit}
            />
        </nav>
     );
}
 
export default Navbar;
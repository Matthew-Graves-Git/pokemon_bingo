import OptionsModal from "./OptionsModal";
import React, { useState } from 'react';


const Navbar = ({filterData,filterEdit}) => {
    const [options, setOptions] = useState(false);

    return ( 
        <nav className="flex justify-between items-center z-10 w-full h-20 text-white bg-black px-4 ">
            <ul>
                <li className="cursor-pointer w-[7ch]" onClick={()=>{setOptions(true); console.log("click")}}>
                    Options
                </li>
            </ul>
            <OptionsModal
                title="Dialog modal example"
                isOpened={options}
                onClose={() => setOptions(false)}
                filterData = {filterData}
                filterEdit = {filterEdit}
            />
        </nav>
     );
}
 
export default Navbar;
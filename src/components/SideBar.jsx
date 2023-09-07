const Sidebar = (props) => {
    const clients = Object.values(props.card)
    return ( 
        <div className="absolute flex flex-row md:flex-col  items-start  gap-2 bottom-0 lg:left-20 md:top-1/3 xl:left-[20%] md:left-2 md:h-full md:w-14 w-full h-14">
                <h2 className="font-semibold text-xl border-b-2 border-red-400">Players</h2>
                {
                
                clients.map((card) => {
                    return(
                    <div className='grid grid-cols-5 h-14 w-14 hover:scale-110 duration-200'> 
                        {card.map((status) => {
                        return(
                            
                                <div className={`border-[1px] hover:scale-110 duration-200 border-gray-100 ${status === 'true' ? 'bg-red-500':'bg-gray-500'}`}>
                                </div>
                            
                            )
                        })}
                    </div>
                    )  
                })
                }
                
            
        </div>
     );
}
 
export default Sidebar;
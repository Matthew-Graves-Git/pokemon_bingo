const Sidebar = (props) => {
    const clients = Object.values(props.card)
    console.log(clients);
    return ( 
        <div className="absolute flex flex-row items-center justify-center gap-2 bottom-0 md:right:0 md:h-screen md:w-14 w-screen h-14">
                
                {
                
                clients.map((card) => {
                    return(
                    <div className='grid grid-cols-5 h-14 w-14'> 
                        {card.map((status) => {
                        return(
                            
                                <div className={`border-[1px] border-gray-100 ${status === 'true' ? 'bg-red-500':'bg-gray-500'}`}>
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
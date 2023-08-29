import {useEffect, useRef } from "react";
import {icons} from '../util/iconData';
import {AiOutlineClose, AiOutlineDown} from 'react-icons/ai'


const isClickInsideRectangle = (e, element) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

const versionOptions = ['Scarlet','Violet']


const OptionsModal = ({
  title,
  isOpened,
  onClose,
  filterData,
  filterEdit
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpened]);

  const selectType = (e) =>{
    let type;
    if(filterData.type) type = [...filterData.type]
    else type = []
    if(e.target.checked){
      type.push(e.target.name)
    }else{
      type = type.filter((name)=>{ return e.target.name !== name })
      if(type.length === 0) type = null
    }
    filterEdit.setType(type)
  }

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="w-96 rounded border-1 border-gray-100 backdrop-contrast-50"
    >
      <h3 className="text-xl font-bold w-[7ch] ml-2 border-b-2 border-red-400">{title}</h3>
      
      <div className="flex gap-5 mt-5 ml-2">
        <form className="flex flex-col gap-3 mb-2" >
          <p className="border-b-2 border-red-400 font-medium w-fit">Type</p>
          <div className="grid grid-cols-6 gap-1" onClick={(e)=>selectType(e)}>
          {icons.map(({name,src,style},index)=>{
            return(
              <div className="flex flex-row-reverse hover:scale-105">
              <label className={`${style} shadow-md h-8 w-8 flex justify-center items-center rounded-full`} for={name}>
                <img className={`h-4 w-4`} src={src} alt={name} />
                <input className="hidden" key={index} type="checkbox" name={name} id={name}></input>
              </label>
              </div>
            )
          })}
          </div>
          
          <label className="border-b-2 border-red-400 font-medium w-fit" for="version-select">Version</label>
          <div>
          <select id="version-select" className="border border-gray-300 rounded-full w-fit text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={(e)=>{filterEdit.setVersion(e.target.value)}}>
            {versionOptions.map((option,index)=>{
              return(<option key={index} value={option}>{option}</option>)
            })}
          </select>
          </div>
          <AiOutlineDown className="absolute bottom-24 left-24" size={14}/>
          <label className="border-b-2 border-red-400 font-medium w-fit" for="encounter">Encounter</label>
          <div className="flex justify-between" onChange={e=>filterEdit.setEncounter(e.target.value)}>
          <input type="range" id="encounter" name="encounter" min="1" max="100"></input>
          <input className="border border-gray-400 rounded-lg w-fit pl-2 font-medium" type="number" value={filterData.encounter} min="1" max="100"></input>
          </div>
        </form>
        <button className="absolute top-1 right-1" onClick={onClose}><AiOutlineClose size={20}/></button>
      </div>
    </dialog>
  );
};

export default OptionsModal;
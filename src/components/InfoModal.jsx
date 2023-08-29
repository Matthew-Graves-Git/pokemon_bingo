import {useEffect, useRef } from "react";
import {AiOutlineClose} from 'react-icons/ai'


const isClickInsideRectangle = (e, element) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};



const InfoModal = ({
  title,
  isOpened,
  onClose,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpened]);

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="w-96 rounded border-1 border-gray-100 backdrop-contrast-50"
    >
      <h3 className="text-xl font-bold w-[7ch] ml-2 mt-2 border-b-2 border-red-400">{title}</h3>
      
      <div className="flex flex-col gap-5 mt-5 ml-2">
        <p className="font-semibold text-xl w-fit">
          Welcome to Pokemon Bingo!
        </p>
        <p className="font-medium w-fit mb-2">
          Pokemon Bingo is a game where you and your friends compete 
          to see who can catch all the pokemon on their bingo card first.
          To begin first press the red reroll button located near the bottom of the Board.
          Additionally, You can filter the pokemon you encounter by game version, typing,
          and encounter rate by clicking the options menu.


        </p>
        <button className="absolute top-2 right-2" onClick={onClose}><AiOutlineClose size={20}/></button>
      </div>
    </dialog>
  );
};

export default InfoModal;
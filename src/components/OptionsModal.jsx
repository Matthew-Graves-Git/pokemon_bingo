import { MouseEvent, useEffect, useRef } from "react";


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

  const proceedAndClose = () => {
    onClose();
  };

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="w-96 rounded border-1 border-gray-100 backdrop-contrast-50"
    >
      <h3>{title}</h3>
      
      <div className="flex gap-5">
        <form >
        <label for="version-select">Version:</label>
          <select id="version-select" onChange={(e)=>{filterEdit.setVersion(e.target.value)}}>
            {versionOptions.map((option,index)=>{
              return(<option key={index} value={option}>{option}</option>)
            })}
          </select>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
};

export default OptionsModal;
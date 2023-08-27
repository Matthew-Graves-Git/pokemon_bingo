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


const OptionsModal = ({
  title,
  isOpened,
  onClose,
  children,
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

      {children}

      <div className="flex gap-5">
        <button onClick={proceedAndClose}>Proceed</button>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
};

export default OptionsModal;
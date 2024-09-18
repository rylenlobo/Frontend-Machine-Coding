import  { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const Shape = ({ data }) => {
  const [selectedBoxes, setSelectedBoxes] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
    
  const timer = useRef(null)
    
  const boxes = useMemo(() => {
    return data.flat();
  }, [data]);

  const visibleBoxCount = useMemo(() => {
    return boxes.reduce((acc, cur) => {
      if (cur === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]);

  useEffect(() => {
    if (visibleBoxCount === selectedBoxes.size) {
      unload();
    }
  }, [selectedBoxes]);

  function unload() {
    setUnloading(true);
    const keys = Array.from(selectedBoxes.keys());
    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();

        setSelectedBoxes((prev) => {
          const updatedBoxes = new Set(prev);
          updatedBoxes.delete(currentKey);
          return updatedBoxes;
        });
        timer.current = setTimeout(removeNextKey, 500);

      }
        
      else {
        setUnloading(false);
        clearTimeout(timer.current);
      }
     
    };

    removeNextKey();
  }

  function handleSelectedBox(e) {
    const { target } = e;
    const selectedIndex = target.getAttribute("data-index");

    if (!selectedIndex || unloading || selectedBoxes.has(selectedIndex)) {
      return;
    }

    setSelectedBoxes((prev) => {
      return new Set(prev.add(selectedIndex));
    });
  }

  return (
    <div className='box-container' onClick={handleSelectedBox}>
      {boxes.map((box, index) => {
        const status = box !== 1;
        const selected = selectedBoxes.has(index.toString());

        return (
          <div
            className={classNames("box", { visible: status, selected })}
            key={`${box}-${index}`}
            data-index={index}
          />
        );
      })}
    </div>
  );
};

Shape.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Shape;


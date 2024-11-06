import waldo1 from '../assets/1.png';
import useOutsideAlerter from './clickOutside';
import { useRef } from 'react';

function Waldo() {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const centerOffset = 15;
  const selectEnd = 25

  // Function to get selected area
  const selectArea = (event) => {
    // Start and end values of tagging area
    let startX = event.target.offsetLeft + event.target.clientLeft;
    let startY = event.target.offsetTop + event.target.clientTop;
    let endX = event.target.offsetLeft + event.target.clientWidth;
    let endY = event.target.offsetTop + event.target.clientHeight;

    // Selected coordinates
    let x = event.pageX;
    let y = event.pageY;
    // Normalized selected coordinates
    let normX = x - startX;
    let normY = y - startY;
    // Offset coords for selection box
    let offsetX = x - centerOffset;
    let offsetY = y - centerOffset;

    console.log(`Starting coords: (${startX}, ${startY})`);
    console.log(`Ending coords: (${endX}, ${endY})`);
    console.log(`Selected coords: (${normX}, ${normY})`);

    let selectedArea = document.querySelector('#selectedArea');

    selectedArea.hidden = false;

    // Check that selection box does not exit tagging area
    if (offsetX < startX) {
      offsetX = startX;
    } else if (offsetX + selectEnd > endX) {
      offsetX = endX - selectEnd;
    }

    if (offsetY < startY) {
      offsetY = startY;
    } else if (offsetY + selectEnd > endY) {
      offsetY = endY - selectEnd;
    }

    selectedArea.style.left = `${offsetX}px`;
    selectedArea.style.top = `${offsetY}px`;
  };

  return (
    <>
      <h1>Where's Waldo?</h1>

      <div ref={wrapperRef}>
        <div id='taggingArea' onClick={selectArea}>
          <img  className="waldo" src={waldo1} alt="Image here" />       
        </div>
      </div>
        
      <div id='selectedArea' hidden={true}>
        <div></div>
        <select name="characters" id="characters">
          <option value="waldo">Waldo</option>
        </select>
        <button id='charSubmit'>Submit</button>
      </div>
    </>
  )
}

export default Waldo;
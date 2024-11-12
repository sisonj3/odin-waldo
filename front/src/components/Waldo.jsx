import waldo1 from '../assets/1.png';
import useOutsideAlerter from './clickOutside';
import { useRef } from 'react';

function Waldo() {
  const username = 'user';

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const centerOffset = 15;
  const selectEnd = 25
  
  let startX;
  let startY;

  let offsetX;
  let offsetY;

  // Create score
  fetch(`http://localhost:3000/score`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: username }),
  }).catch(err => console.error(err));;

  // Function to get selected area
  const selectArea = (event) => {
    // Start and end values of tagging area
    startX = event.target.offsetLeft + event.target.clientLeft;
    startY = event.target.offsetTop + event.target.clientTop;
    let endX = event.target.offsetLeft + event.target.clientWidth;
    let endY = event.target.offsetTop + event.target.clientHeight;

    // Selected coordinates
    let x = event.pageX;
    let y = event.pageY;
    // Normalized selected coordinates
    let normX = x - startX;
    let normY = y - startY;
    // Offset coords for selection box
    offsetX = x - centerOffset;
    offsetY = y - centerOffset;

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

  // Check if coords are correct
  const checkCoords = (event) => {    
    let image = document.querySelector('.waldo');
    let imageSrc = image.src;
    let imageName = imageSrc.split('/');
    let imageId = imageName[imageName.length - 1].split(".")[0];

    console.log(imageId);

    fetch(`http://localhost:3000/waldo/${imageId}`, {
      mode: 'cors',
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        let newX = offsetX - startX;
        let newY = offsetY - startY;
        let newEndX = newX + selectEnd;
        let newEndY = newY + selectEnd;

        console.log(newX + '<' + response.x + '<' + newEndX);
        console.log(newY + '<' + response.y + '<' + newEndY);

        if ((newX < response.x && response.x < newEndX) && (newY < response.y && response.y < newEndY)) {
          // Update score
          fetch('http://localhost:3000/score', {
            mode: 'cors',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username }),
          }).then(response => {
            // Get final time
            fetch(`http://localhost:3000/score/${username}`, {
              mode: 'cors',
              methdod: 'GET',
            })
              .then(response => response.json())
              .then(response => {
                console.log(`Found in ${response.finalTime}`);
              })
              .then(response =>
                // Reset score db
                fetch(`http://localhost:3000/score`, {
                  mode: 'cors',
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ name: username }),
                  }).catch(err => console.error(err)))
              .catch(error => console.error(error));
          }).catch(err => console.error(err));;

                    
        } else {
          alert("Wrong!");
        }
      })
      .catch(error => console.error(error));
    
  }

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
        <button id='charSubmit' onClick={checkCoords}>Submit</button>
      </div>
    </>
  )
}

export default Waldo;
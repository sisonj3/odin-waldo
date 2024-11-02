import './App.css'

function App() {

  const centerOffset = 15;
  const selectEnd = 25

  // Function to get selected area
  const selectArea = (event) => {
    // Target values
    let startX = event.target.offsetLeft + event.target.clientLeft;
    let startY = event.target.offsetTop + event.target.clientTop;
    let endX = event.target.offsetLeft + event.target.clientWidth;
    let endY = event.target.offsetTop + event.target.clientHeight;

    // Selected coordinates
    let x = event.pageX - centerOffset;
    let y = event.pageY - centerOffset;

    // console.log(`Starting coords: (${startX}, ${startY})`);
    // console.log(`Ending coords: (${endX}, ${endY})`);
    //console.log(`Selected coords: (${x}, ${y})`);

    let selectedArea = document.querySelector('#selectedArea');

    selectedArea.hidden = false;

    // Check that selection box does not exit tagging area
    if (x < startX) {
      x = startX;
    } else if (x + selectEnd > endX) {
      x = endX - selectEnd;
    }

    if (y < startY) {
      y = startY;
    } else if (y + selectEnd > endY) {
      y = endY - selectEnd;
    }

    selectedArea.style.left = `${x}px`;
    selectedArea.style.top = `${y}px`;
  };

  return (
    <>
      <h1>Hello, World!</h1>

      <div id='taggingArea' onClick={selectArea}>
        <p>Image Here</p>        
      </div>

      <div id='selectedArea' hidden={true}></div>
    </>
  )
}

export default App

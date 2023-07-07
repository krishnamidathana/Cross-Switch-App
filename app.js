const heightInput = document.getElementById("height-input");
const widthInput = document.getElementById("width-input");
const colorInput = document.getElementById("color-input");

const createGridbtn = document.getElementById("create-grid");
const saveGridbtn = document.getElementById("save-grid");
const clearGridbtn = document.getElementById("clear-grid");

const errMessage = document.querySelector(".err-message");
const container = document.querySelector(".container");
const grid = document.getElementById("grid");

function createGrid() {
  errMessage.innerText = "";
  grid.innerHTML = "";

  const height = parseInt(heightInput.value) || 10;
  const width = parseInt(widthInput.value) || 10;

  if (height > 20 || width > 20) {
    errMessage.innerText = "Height and Width cannot be morethan 20";
    return false;
  }

  grid.style.gridTemplateColumns = `repeat(${width},1fr)`;

  for (let i = 0; i < height * width; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    tile.addEventListener("click", (e) => {
      e.target.style.color = colorInput.value;
      if (e.target.innerText == "x") {
        e.target.innerText = "";
      } else {
        e.target.innerText = "x";
      }
    });
    grid.appendChild(tile);
  }
}

function clearGrid() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((element) => {
    element.innerText = "";
  });
}

function saveGrid() {
  html2canvas(grid).then((canvas) => {
    const imgURL = canvas.toDataURL();
    const download = document.createElement("a");
    download.setAttribute("href", imgURL);
    download.setAttribute("download", "img.png");
    download.click();
    download.remove();
  });
}

createGridbtn.addEventListener("click", createGrid);
saveGridbtn.addEventListener("click", saveGrid);
clearGridbtn.addEventListener("click", clearGrid);

window.addEventListener("load", () => {
  errMessage.innerText = "";
  createGrid();
});

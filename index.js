const container = document.querySelector('.grid-container');
const button = document.querySelector('#button');

createGrid(16);

function createGrid(size) {
    container.style.cssText = `grid-template-columns: repeat(${size}, 1fr); 
            grid-template-rows: repeat(${size}, 1fr);`;
    const number = size * size;

    for (let i = 0; i < number; i++) {
        const square = document.createElement('div');
        container.appendChild(square);
        square.classList.add('square');
    }
}

function paintBlack(event) {
    const targetElement = event.target;
    targetElement.style.backgroundColor = 'black';
}

function randomRGBNumber() {
    return Math.floor(Math.random() * 255);
}

function paintRandomColor(event) {
    const targetElement = event.target;
    targetElement.style.backgroundColor = `rgba(${randomRGBNumber()}, 
                ${randomRGBNumber()}, 
                ${randomRGBNumber()})`;
}

function resizeGrid(input) {
    const container = document.querySelector('.grid-container');
    const square = document.querySelectorAll('.square');
    
    if(!isNaN(input) && input >= 16 && input <= 64) {
        console.log('Esta dentro del rango');
        for (const i of square) {
            container.removeChild(i);
        }
        createGrid(input);
    }
}

function erase(event) {
    const targetElement = event.target;
    targetElement.style.backgroundColor = 'transparent';
}

function drawWithBlack(event) {
    console.log('black');
    container.addEventListener('mousedown', (e) => {
        paintBlack(e);

        container.addEventListener('mousemove', paintBlack);

        window.addEventListener('mouseup', () => {
            container.removeEventListener('mousemove', paintBlack);
        });
    });
}

function drawWithRandomColor(event) {
    console.log('random');
    container.addEventListener('mousedown', (e) => {
        paintRandomColor(e);

        container.addEventListener('mousemove', paintRandomColor);

        window.addEventListener('mouseup', () => {
            container.removeEventListener('mousemove', paintRandomColor);
        });
    });
}

// CAMBIA TAMAÑO DEL GRID
button.addEventListener('click', () => {
    const input = prompt('Input the number of squares per size');
    const numbericValue = Number(input);
    resizeGrid(numbericValue);
});

const blackButton = document.querySelector('#black-button');
const randomButton = document.querySelector('#random-button');
const eraserButton = document.querySelector('#eraser-button');
const clearButton = document.querySelector('#clear-button');

drawWithBlack();

blackButton.addEventListener('click', (e) => {
    drawWithBlack(e);
});

randomButton.addEventListener('click', drawWithRandomColor);

eraserButton.addEventListener('click', (e) => {
    container.addEventListener('mousedown', (e) => {
        erase(e);

        container.addEventListener('mousemove', erase);

        window.addEventListener('mouseup', () => {
            container.removeEventListener('mousemove', erase);
            console.log('removed');
        });
    });
})

clearButton.addEventListener('click', () => {
    console.log('clean');

    const squares = document.querySelectorAll('.square');
    for (const square of squares) {
        square.style.backgroundColor = 'transparent';
    }
});
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

function drawWithBlack() {
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

function shade(element, opacity) {
    element.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
}

// CAMBIA TAMAÑO DEL GRID
button.addEventListener('click', () => {
    const input = prompt('Input the number of squares per size');
    const numbericValue = Number(input);
    resizeGrid(numbericValue);
});

drawWithBlack();

let blackButtonState = false;
let eraserButtonState = false;
let randomButtonState = false;
let clearButtonState = false;
let shadingButtonState = false;

let cont = 0;

document.addEventListener('click', (e) => {
    const button = e.target;
    
    if(button.matches('#black-button')) {
        eraserButtonState = false;
        randomButtonState = false; 
        clearButtonState = false;
        shadingButtonState = false;
        blackButtonState = true; 
    }

    if(button.matches('#eraser-button')) {
        randomButtonState = false; 
        clearButtonState = false;
        shadingButtonState = false;
        blackButtonState = false; 
        eraserButtonState = true;
    }

    if (button.matches('#random-button')) { 
        clearButtonState = false;
        shadingButtonState = false;
        blackButtonState = false; 
        eraserButtonState = false; 
        randomButtonState = true; 
    }

    if(button.matches('#clear-button')) {
        randomButtonState = false; 
        shadingButtonState = false;
        blackButtonState = false; 
        eraserButtonState = false;
        clearButtonState = true;
    }

    if(button.matches('#shading')) {
        eraserButtonState = false;
        blackButtonState = false; 
        randomButtonState = false; 
        clearButtonState = false;
        shadingButtonState = true;
    }

    if(button.matches('#clear-button') && clearButtonState) {
        console.log('clean button');

        const squares = document.querySelectorAll('.square');
        for (const square of squares) {
            square.style.backgroundColor = 'transparent';
        }
    }

    container.addEventListener('mousedown', (e) => {

        if (button.matches('#black-button') && blackButtonState) {
            console.log('black button');

            paintBlack(e);
            container.addEventListener('mousemove', paintBlack);

            window.addEventListener('mouseup', () => {
                container.removeEventListener('mousemove', paintBlack);
            });
        }
    
        if (button.matches('#eraser-button') && eraserButtonState) {
            console.log('erase button');
            erase(e);

            container.addEventListener('mousemove', erase);

            window.addEventListener('mouseup', () => {
                container.removeEventListener('mousemove', erase);
            });
        }

        if (button.matches('#random-button') && randomButtonState) {
            console.log('random button');
            paintRandomColor(e);

            container.addEventListener('mousemove', paintRandomColor);

            window.addEventListener('mouseup', () => {
                container.removeEventListener('mousemove', paintRandomColor);
            });
        }

        if (button.matches('#shading') && shadingButtonState) {
            const element = e.target;
            cont += 0.1;

            shade(element, cont);

            // container.addEventListener('mousemove', shade(e, cont));

            // window.addEventListener('mouseup', () => {
            //     container.removeEventListener('mousemove', shade);
            // });
        }
    });
});
const container = document.querySelector('.grid-container');

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

function shade(event = 'mousemove') {
    const squares = document.querySelectorAll('.square');

    for (const square of squares) {
        square.addEventListener(event, (e) => {
            if(square.style.opacity >= 0.1) {
                square.style.backgroundColor = 'black';
                square.style.opacity = Number(square.style.opacity) + 0.1;
            } else {
                square.style.backgroundColor = 'black';
                square.style.opacity = 0.1;
            }
        });
    }
}

// CAMBIA TAMAÑO DEL GRID
const slider = document.querySelector('#slider');
const sliderOutput = document.querySelector('#slider-output');
slider.addEventListener('input', () => {
    sliderOutput.textContent = slider.value;
    const numbericValue = slider.value;
    resizeGrid(numbericValue);
});

// drawWithBlack();

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

    if (button.matches('#shading') && shadingButtonState) {
        console.log('shading');
        shade('mousedown');

        container.addEventListener('mousemove', shade());

        window.addEventListener('mouseup', () => {
            container.removeEventListener('mousemove', shade());
        });
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
    });
});
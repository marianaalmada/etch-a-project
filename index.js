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

function paint(event) {
    const targetElement = event.target;
    targetElement.style.backgroundColor = 'black';
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

button.addEventListener('click', () => {
    const input = prompt('Input the number of squares per size');
    const numbericValue = Number(input);
    resizeGrid(numbericValue);
});

container.addEventListener('mousedown', (e) => {
    paint(e);

    container.addEventListener('mousemove', paint);

    window.addEventListener('mouseup', () => {
        container.removeEventListener('mousemove', paint);
    });
});
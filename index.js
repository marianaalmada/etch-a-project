const container = document.querySelector('.grid-container');

for (let i = 0; i < 256; i++) {
    const square = document.createElement('div');
    // square.classList.add('square');
    container.appendChild(square);
}

function paint(event) {
    const targetElement = event.target;
    targetElement.style.backgroundColor = 'black';
}

container.addEventListener('mousedown', (e) => {
    paint(e);

    container.addEventListener('mousemove', paint);

    window.addEventListener('mouseup', () => {
        console.log('stop');
        container.removeEventListener('mousemove', paint);
    });
});
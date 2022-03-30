const buttons = document.querySelectorAll('button');
const drawboard = document.querySelector('.drawboard');

let pixel = '';
let gridNum = 16;

const populate = (drawGrid) => {
    for (let i = 0; i < drawGrid ** 2; i++) {
        pixel = document.createElement('div');
        pixel.classList.toggle('pixel');
        pixel.style.backgroundColor = 'white';
        drawboard.appendChild(pixel);  
    }
    drawboard.style.gridTemplateColumns = `repeat(${drawGrid}, auto)`;
    drawboard.style.gridTemplateRows = `repeat(${drawGrid}, auto)`;
}

populate(gridNum);

const resize = (request) => {
    if(request === 'resize' || request === 'clear') {
        gridNum = prompt('Please enter a number no greater than 100!', 16);
        if(gridNum > 100 || gridNum === null) {
            gridNum = 100
        }
    }
    drawboard.innerHTML = '';
    populate(gridNum);
    draw();
}

let currentStyle = 'black';
buttons.forEach(btn => {
    btn.addEventListener('click', () => { 
        if(btn.id === 'resize' || btn.id === 'clear'){
    resize(btn.id);
    }
    else {
        currentStyle = btn.id;
        resize(btn.id);
    }
    });
});

const randomColor = () => {
    let color = 'rgba(';
    for(let i = 0; i < 3; i++) {
        color += `${Math.floor(Math.random() * 255)},`;
    }
    return color + '1)';
}

const shading = (clr) => {
    let color = 'rgba(';
    clr = clr.parseInt(clr.splice(4, clr.indexOf(',') - 4));
    if(clr === 255) {
        clr = 100;
    } else if(clr > 0) {
        clr -= 5;
    }
    for(let i = 0; i < 3; i++) {
        color += `${clr},`;
    }
    return color + '1)';
}

const draw = () => {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pxl  => {
        pxl.addEventListener('mouseover', (e) => {
            let currentColor = getComputedStyle(pxl, null).getPropertyValue('background-color');
            switch(currentStyle) {
                case 'black':
                    e.target.style.backgroundColor = 'rgba(0,0,0)';
                    break;
                 case 'rainbow':
                    e.target.style.backgroundColor = randomColor();
                    break;
                case 'shading':
                    e.target.style.backgroundColor = shading(currentColor);
                    break;
            }
        })
    })
}

draw();
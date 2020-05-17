const FPS = 60; //Fotogramas por segundo :3
const SPEED = 6.6; //Velocidad de movimiento de los gatitos (% de ancho de ventana) :3
const SPACE = 5; //Espacio de separacion de gatitos (% de ancho de ventana) :3
const START_OFFSET = 1; //Offset del tiempo en instanciar el primer gatito (segundos) :3
const CAT_SIZE = 8; //Anchura de los gatitos (% de ancho de ventana) :3

var head = 'images/catparade/head.gif';
var drum = 'images/catparade/drum.gif';

var cats = [
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum,
    head,
    drum
];

var catInstances;
var catInstancesPos = 0;
var deltaTime = 0;
var running = false;
var catParent = document.getElementById('catParade');

document.getElementById('loveMessage').addEventListener('click', start);

async function start(){
    /*if(!running){
        running = true;
        create();
        playSong();
        update();
    }*/

    alert('Work in process :3');
}

async function update(){
    let lastime;
    while(running){
        lastime = performance.now();
        move();
        await wait(1000 / FPS);
        deltaTime = (performance.now() - lastime) / 1000;
    }
}

function move(){
    catInstancesPos += deltaTime * SPEED;
    catInstances.style.left = catInstancesPos + 'vw';
}

function playSong(){
    let audio = new Audio('sounds/catparade.mp3');
    audio.autoplay = true;
    audio.onended = finish;
    audio.volume = 0.5;
    audio.play();
}

function create(){
    let dom = document.createElement('div');
    let position = -CAT_SIZE - START_OFFSET * SPEED;

    for(var cat of cats){
        let image = document.createElement('img');
        image.src = cat;
        image.style.position = 'absolute';
        image.style.bottom = 0;
        image.style.width = CAT_SIZE + 'vw';
        image.style.maxWidth = CAT_SIZE * 2 + 'vh';
        image.style.left = position + 'vw';
        dom.appendChild(image);  
        position -= SPACE + CAT_SIZE;
    }

    dom.className = 'cat-parade';
    dom.style.left = '0';
    catParent.appendChild(dom); 
    catInstances = dom;
}

function wait(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, time);
    });
}

function finish(){
    running = false;
    catParent.removeChild(catInstances);
    catInstancesPos = 0;
}
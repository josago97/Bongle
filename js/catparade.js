const FPS = 100; //Fotogramas por segundo :3
const SPACE = 1; //Espacio de separacion de gatitos (% de ancho de ventana) :3
const START_OFFSET = 1; //Offset del tiempo en instanciar el primer gatito (segundos) :3
const CAT_SIZE = 12; //Anchura de los gatitos (% de ancho de ventana) :3

var head = 'images/catparade/head.gif';
var accordion = 'images/catparade/accordion.gif';
var bassDrum = 'images/catparade/bassdrum.gif';
var drum = 'images/catparade/drum.gif';
var flute = 'images/catparade/flute.gif';
var guitar = 'images/catparade/guitar.gif';
var tambourine = 'images/catparade/tambourine.gif';
var triangle = 'images/catparade/triangle.gif';
var tuba = 'images/catparade/tuba.gif';
var xylophone = 'images/catparade/xylophone.gif';


var cats = [
    head,
    drum,
    guitar,
    tambourine,
    flute,
    flute,
    flute,
    xylophone,
    triangle,
    tuba,
    accordion,
    tambourine,
    drum,
    flute,
    accordion,
    xylophone,
    guitar,
    bassDrum
];

var audio;
var catInstances;
var catInstancesPos = 0;
var deltaTime = 0;
var running = false;
var catParent = document.getElementById('catParade');
var size;

document.getElementById('loveMessage').addEventListener('click', start);

async function start(){
    if(!running){
        running = true;
        create();
        playSong();
        update();
    }
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
    var prop = (audio.currentTime - START_OFFSET) / (audio.duration - START_OFFSET);
    catInstances.style.left = prop * (size + 100) + 'vw';
}

function playSong(){
    audio = new Audio('sounds/catparade.mp3');
    audio.autoplay = true;
    audio.onended = finish;
    audio.volume = 0.5;
    audio.play();
}

function create(){
    let dom = document.createElement('div');
    let position = -CAT_SIZE / 2;

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
    size = CAT_SIZE * cats.length + SPACE * (CAT_SIZE - 1);
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
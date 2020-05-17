var audioMeow = 'sounds/kitten4.wav';
var normal = 'images/cat/cat_normal.png';
var meowed = 'images/cat/cat_meowed.png';
var lefts = [
    'images/cat/left/cat_left_1.png',
    'images/cat/left/cat_left_2.png',
    'images/cat/left/cat_left_3.png',
    'images/cat/left/cat_left_4.png'
  ];
var rights = [
    'images/cat/right/cat_right_1.png',
    'images/cat/right/cat_right_2.png',
    'images/cat/right/cat_right_3.png',
    'images/cat/right/cat_right_4.png'
  ];

var image = document.getElementById('catImage');
var input = document.getElementById('searchInput');

var keyPressed;
var rightArm;
var meowing;
var timer;

start();


function start(){
    preload();
    image.src = normal;
    image.addEventListener('click', meow);
    input.addEventListener('keydown', onKeyDown);
    input.addEventListener('keyup', onKeyUp);
    input.addEventListener('focusout', onFocusOut);
}

function preload(){
    let images = lefts.concat(rights).concat(normal).concat(meowed);
    preloadImages(images);
    preloadAudio(audioMeow);
}

function onKeyDown(event){
    clearTimeout(timer);

    if(keyPressed != event.key && !event.repeat && !meowing ){
        let arm = rightArm ? lefts : rights;
        let index = Math.floor(Math.random() * arm.length);
        image.src = arm[index];
        rightArm = !rightArm;
        keyPressed = event.key;
    }   
}

function onKeyUp(event){
    if(event.key == keyPressed){
        onFocusOut();
        keyPressed = null;
    }
}

function onFocusOut(){
    timer = setTimeout(function(){image.src = normal;}, 100);
}

function meow(){
    if(!meowing){
        clearTimeout(timer);
        meowing = true;
        image.src = meowed;
        let audio = new Audio(audioMeow);
        audio.onended = function(){meowing = false; image.src = normal};
        audio.volume = 0.25;
        /*audio.playbackRate = 2;
        audio.webkitPreservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.preservesPitch = false;*/
        audio.play();
    }
}
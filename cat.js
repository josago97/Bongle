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

var rightArm;
var meowing;
var timer;

start();

function start(){
    image.src = normal;
    image.addEventListener('click', meow);
    input.addEventListener('keydown', onKeyDown);
}

function onKeyDown(event){
    clearTimeout(timer);

    if(!event.repeat && !meowing){
        let arm = rightArm ? lefts : rights;
        let index = Math.floor(Math.random() * arm.length);
        image.src = arm[index];
        rightArm = !rightArm;
    }

    timer = setTimeout(function(){image.src = normal;}, 500);
}

function meow(){
    if(!meowing){
        clearTimeout(timer);
        meowing = true;
        image.src = meowed;
        let audio = new Audio('sounds/kitten4.wav');
        audio.onended = function(){meowing = false; image.src = normal};
        audio.volume = 0.25;
        /*audio.playbackRate = 2;
        audio.webkitPreservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.preservesPitch = false;*/
        audio.play();
    }
}
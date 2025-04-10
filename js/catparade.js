const FPS = 100 // Fotogramas por segundo :3
const SPACE = 1 // Espacio de separacion de gatitos (% de ancho de ventana) :3
const START_OFFSET = 1 // Offset del tiempo en instanciar el primer gatito (segundos) :3
const CAT_SIZE = 12 // Anchura de los gatitos (% de ancho de ventana) :3

const HEAD = "images/catparade/head.gif"
const ACCORDION = "images/catparade/accordion.gif"
const BASS_DRUM = "images/catparade/bassdrum.gif"
const DRUM = "images/catparade/drum.gif"
const FLUTE = "images/catparade/flute.gif"
const GUITAR = "images/catparade/guitar.gif"
const TAMBOURINE = "images/catparade/tambourine.gif"
const TRIANGLE = "images/catparade/triangle.gif"
const TUBA = "images/catparade/tuba.gif"
const XYLOPHONE = "images/catparade/xylophone.gif"

const CATS = [
  HEAD,
  DRUM,
  GUITAR,
  TAMBOURINE,
  FLUTE,
  FLUTE,
  FLUTE,
  XYLOPHONE,
  TRIANGLE,
  TUBA,
  ACCORDION,
  TAMBOURINE,
  DRUM,
  FLUTE,
  ACCORDION,
  XYLOPHONE,
  GUITAR,
  BASS_DRUM,
]

let audio
let running = false
let size
const catsContainer = document.getElementById("cat-parade")

function initCatParade() {
  running = false
  catsContainer.innerHTML = null
  document.getElementById("love-message").addEventListener("click", start)
}

function start() {
  if (!running) {
    running = true
    create()
    playSong()
    update()
  }
}

async function update() {
  while (running) {
    move()
    await delay(1000 / FPS)
  }
}

function move() {
  const totalTime = audio.duration - START_OFFSET
  const currentTime = audio.currentTime - START_OFFSET
  const factor = currentTime / totalTime
  catsContainer.style.left = factor * (size + 100) + "vw"
}

function playSong() {
  audio = new Audio("sounds/catparade.mp3")
  audio.autoplay = true
  audio.onended = finish
  audio.volume = 0.5
  audio.play()
}

function create() {
  let position = -CAT_SIZE / 2

  for (const cat of CATS) {
    const image = document.createElement("img")
    image.src = cat
    image.style.position = "absolute"
    image.style.bottom = 0
    image.style.minWidth = CAT_SIZE * 5 + "px"
    image.style.width = CAT_SIZE + "vw"
    image.style.maxWidth = CAT_SIZE * 2 + "vh"
    image.style.left = position + "vw"
    catsContainer.appendChild(image)
    position -= SPACE + CAT_SIZE
  }

  catsContainer.style.left = "-100vw"
  size = CAT_SIZE * CATS.length + SPACE * (CAT_SIZE - 1)
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function finish() {
  running = false
  catsContainer.innerHTML = null
}

const FPS = 100 // Fotogramas por segundo :3
const SPACE = 1 // Espacio de separacion de gatitos (% de ancho de ventana) :3
const START_OFFSET = 1 // Offset del tiempo en instanciar el primer gatito (segundos) :3
const CAT_SIZE = 12 // Anchura de los gatitos (% de ancho de ventana) :3
const CAT_CLASS_NAME = "cat" // Clase para aplicar estilo a los gatos con instrumentos

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
let catInstances
let catInstancesPos = 0
let deltaTime = 0
let running = false
let catParent = document.getElementById("cat-parade")
let size

document.getElementById("love-message").addEventListener("click", start)

async function start() {
  if (!running) {
    running = true
    create()
    playSong()
    update()
  }
}

async function update() {
  let lastime
  while (running) {
    lastime = performance.now()
    move()
    await wait(1000 / FPS)
    deltaTime = (performance.now() - lastime) / 1000
  }
}

function move() {
  const prop =
    (audio.currentTime - START_OFFSET) / (audio.duration - START_OFFSET)
  catInstances.style.left = prop * (size + 100) + "vw"
}

function playSong() {
  audio = new Audio("sounds/catparade.mp3")
  audio.autoplay = true
  audio.onended = finish
  audio.volume = 0.5
  audio.play()
}

function create() {
  const dom = document.createElement("div")
  let position = -CAT_SIZE / 2

  for (var cat of CATS) {
    const image = document.createElement("img")
    image.src = cat
    image.style.position = "absolute"
    image.style.bottom = 0
    image.style.minWidth = CAT_SIZE * 5 + "px"
    image.style.width = CAT_SIZE + "vw"
    image.style.maxWidth = CAT_SIZE * 2 + "vh"
    image.style.left = position + "vw"
    dom.appendChild(image)
    position -= SPACE + CAT_SIZE
  }

  dom.className = CAT_CLASS_NAME
  dom.style.left = "-100vw"
  catParent.appendChild(dom)
  catInstances = dom
  size = CAT_SIZE * CATS.length + SPACE * (CAT_SIZE - 1)
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function finish() {
  running = false
  catParent.removeChild(catInstances)
  catInstancesPos = 0
}

/* ============================= Keyboard cat ============================== */

const meowAudio = "sounds/kitten4.wav"
const keyCatNormal = "images/cat/cat_normal.png"
const keyCatMeowed = "images/cat/cat_meowed.png"
const keyCatLefts = [
  "images/cat/left/cat_left_1.png",
  "images/cat/left/cat_left_2.png",
  "images/cat/left/cat_left_3.png",
  "images/cat/left/cat_left_4.png",
]
const keyCatRights = [
  "images/cat/right/cat_right_1.png",
  "images/cat/right/cat_right_2.png",
  "images/cat/right/cat_right_3.png",
  "images/cat/right/cat_right_4.png",
]
const keyCatImage = document.getElementById("keyboardCat")
let isMeowing = false
let isRightArmTurn = Math.random() < 0.5
let lastKeyPressed = null
let catKeytimer = null

function initKeyboardCat() {
  preload()

  keyCatImage.src = keyCatNormal
  keyCatImage.addEventListener("click", meow)

  const searchInput = document.getElementById("searchInput")
  searchInput.addEventListener("keydown", onKeyDown)
  searchInput.addEventListener("keyup", onKeyUp)
  searchInput.addEventListener("focusout", onFocusOut)
}

function preload() {
  const images = [keyCatNormal, keyCatMeowed, ...keyCatLefts, ...keyCatRights]
  preloadImages(images)
  preloadAudio(meowAudio)
}

function onKeyDown(event) {
  clearTimeout(catKeytimer)

  if (lastKeyPressed != event.key && !event.repeat && !isMeowing) {
    const arms = isRightArmTurn ? keyCatLefts : keyCatRights
    const randomIndex = Math.floor(Math.random() * arms.length)
    keyCatImage.src = arms[randomIndex]
    isRightArmTurn = !isRightArmTurn
    lastKeyPressed = event.key
  }
}

function onKeyUp(event) {
  if (event.key == lastKeyPressed) {
    onFocusOut()
    lastKeyPressed = null
  }
}

function onFocusOut() {
  catKeytimer = setTimeout(() => {
    keyCatImage.src = keyCatNormal
  }, 200)
}

function meow() {
  if (!isMeowing) {
    clearTimeout(catKeytimer)
    isMeowing = true
    keyCatImage.src = keyCatMeowed
    const audio = new Audio(meowAudio)
    audio.onended = () => {
      isMeowing = false
      keyCatImage.src = keyCatNormal
    }
    audio.volume = 0.25
    audio.play()
  }
}

/* ============================= Localization ============================== */

const localizationDisplay = document.getElementById("localization")
const changeLocalizationButtom = document.getElementById("changeLocalization")
let localizationPositionElement
let localizationIpElement
let showIp = false

async function initLocalization() {
  changeLocalizationButtom.style.display = "none"
  changeLocalizationButtom.addEventListener("click", changeLocalization, false)
  localizate()
}

async function localizate() {
  try {
    const response = await (
      await fetch("https://get.geojs.io/v1/ip/geo.json")
    ).json()

    // Ponemos posición geográfica
    const position = [response.city, response.region, response.country].join(
      ", "
    )
    const coordenates = `${response.latitude},${response.longitude}`
    const maps = `https://www.google.es/maps/@${coordenates},12z`
    localizationPositionElement = document.createElement("a")
    localizationDisplay.appendChild(localizationPositionElement)
    localizationPositionElement.href = maps
    localizationPositionElement.innerHTML = position
    localizationPositionElement.className = "footer-link"

    // Ponemos dirección IP
    const ip = response.ip
    localizationIpElement = document.createElement("span")
    localizationDisplay.appendChild(localizationIpElement)
    localizationIpElement.innerHTML = ip

    changeLocalizationButtom.style.display = "initial"
    updateLocalization()
  } catch {
    localizationDisplay.innerHTML =
      "Error geolocalization (try disable Ad Blockers)"
  }
}

function changeLocalization() {
  showIp = !showIp
  updateLocalization()
}

function updateLocalization() {
  if (showIp) {
    localizationPositionElement.style.display = "none"
    localizationIpElement.style.display = "initial"
    changeLocalizationButtom.src = "images/ip.png"
  } else {
    localizationPositionElement.style.display = "initial"
    localizationIpElement.style.display = "none"
    changeLocalizationButtom.src = "images/world.png"
  }
}

/* ================================= Searcher ================================= */

const searchContainer = document.getElementById("searchContainer")
const searchInput = document.getElementById("searchInput")
const searchInputClear = document.getElementById("searchClearInput")
const form = document.getElementById("searchForm")

function initSearcher() {
  searchContainer.addEventListener("focus", focusSearchInput)
  searchInput.addEventListener("input", onInputChanged)
  form.addEventListener("submit", onSearchSubmit)

  focusSearchInput()
  onInputChanged()
}

function focusSearchInput() {
  searchInput.focus()
}

function getSearchInputValue() {
  return searchInput.value.trim()
}

function onSearchSubmit(event) {
  event.preventDefault() // Evita que el formulario se envíe

  const text = getSearchInputValue()

  if (text.length > 0) {
    searchInput.autocomplete = "off"
    window.location = `https://www.google.com/search?q=${text}`
  }
}

function onInputChanged() {
  searchInput.autocomplete = "on"

  if (searchInput.value.length > 0) {
    searchInputClear.style.visibility = "visible"
  } else {
    searchInputClear.style.visibility = "hidden"
  }
}

function clearInput() {
  searchInput.value = ""
  focusSearchInput()
  onInputChanged()
}

async function getLuck() {
  searchInput.autocomplete = "off"
  const text = getSearchInputValue()

  if (text.length > 0) {
    const queryUrl = `https://www.google.com/search?q=${text}`
    const proxyUrl = `https://api.allorigins.win/raw?charset=UTF-8&url=${queryUrl}`

    try {
      const html = await (await fetch(proxyUrl)).text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const url = doc
        .querySelector("div.egMi0.kCrYT a")
        .getAttribute("href")
        .replace("/url?q=", "")
        .split("&sa=U")[0]

      window.location = decodeURIComponent(url)
    } catch {
      window.location = "https://www.google.com/doodles"
    }
  } else {
    window.location = "https://www.google.com/doodles"
  }
}

/* ================================= Utilities ================================= */

function preloadImages(images) {
  images.forEach((element) => {
    preloadImage(element)
  })
}

function preloadImage(image) {
  const aux = new Image()
  aux.src = image
}

function preloadAudio(audio) {
  const aux = new Audio(audio)
  aux.preload = "auto"
}

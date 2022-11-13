var parent = document.getElementById('localization');
var changeButtom = document.getElementById('changeLocalization');
var positionElement;
var ipElement;
var showPosition = true;

start();

function start(){
    changeButtom.style.display = 'none';
    changeButtom.addEventListener('click', changeLocalization, false);
    geolocalizate();
}

function geolocalizate(){
    let element = document.getElementById('localization');
    fetch('http://ip-api.com/json')     //'https://ipinfo.io/json'
    .then(response => response.json())
    .then(function(result) {    
        let position = [result.city, result.regionName, result.country].join(', ');
        let coordenates = `${result.lat},${result.lon}`; 
        let maps = 'https://www.google.es/maps/@' + coordenates + ',12z';
        positionElement = document.createElement('a');
        element.appendChild(positionElement);
        positionElement.href = maps;
        positionElement.innerHTML = position;
        positionElement.className = 'footer-link';

        let ip = result.query;
        ipElement = document.createElement('span');
        element.appendChild(ipElement);
        ipElement.innerHTML = ip;

        changeButtom.style.display = 'initial';
        showLocalization();
    })
    .catch(function() { 
        element.innerHTML = 'Error geolocalization (try disable Ad Blockers)';
    });
}

function changeLocalization(){
    showPosition = !showPosition;
    showLocalization();
}

function showLocalization(){
    if(showPosition){
        positionElement.style.display = 'initial';
        ipElement.style.display = 'none';
        changeButtom.src = 'images/world.png';
    }else{
        positionElement.style.display = 'none';
        ipElement.style.display = 'initial';
        changeButtom.src = 'images/ip.png';
    }
}

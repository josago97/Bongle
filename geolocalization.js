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
    let request = new XMLHttpRequest();
    request.open('GET', 'http://ip-api.com/json', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.onreadystatechange = function() { 
        if (this.readyState == 4 && this.status == 200) {
            let result = JSON.parse(this.responseText);
            if(result.status == 'success'){
                
                let position = [result.city, result.regionName, result.country].join(', ');
                let maps = 'https://www.google.es/maps/@' + result.lat + ',' + result.lon + ',10z';
                positionElement = document.createElement('a');
                element.appendChild(positionElement);
                positionElement.href = maps;
                positionElement.innerHTML = position;
                positionElement.className = 'footer-link';

                let ip = result.query;
                ipElement = document.createElement('span');
                element.appendChild(ipElement);
                ipElement.innerHTML = 'Your IP: ' + ip;

                changeButtom.style.display = 'initial';
                showLocalization();
            }
        } 
    };
    
    request.onerror = function() { 
        element.innerHTML = 'Error localization (disable Ad Blockers)';
    };
    request.send();
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

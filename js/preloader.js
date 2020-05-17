function preloadImages(images){
    images.forEach(element => {
        preloadImage(element);
    });
}

function preloadImage(image){
    let aux = new Image();
    aux.src = image;
}

function preloadAudio(audio){
    let aux = new Audio(audio);
    aux.preload = 'auto';
}
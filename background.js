const body = document.querySelector("body");

function loadBackGround(){
    const randomNum = Math.floor(Math.random()*8+1);
    if(randomNum > 8){
        return
    }else{
        body.style.backgroundImage = `url(images/${randomNum}.jpg)`;
    }
}


function init(){
    loadBackGround();
}
init();
const weatherDiv = document.getElementById("weatherIcon");
const apiKey ="9152ae4521d2b0c952df14ae9105c13b";
const weatherInfo = document.querySelector(".weatherInfo");


function getWeatherIcon(code){
    weatherDiv.style.backgroundImage =`url(http://openweathermap.org/img/wn/${code}@2x.png)`;
}

function paintWeather(weather,city,temp,code,description){
    getWeatherIcon(code);
    weatherInfo.innerHTML = `${temp}°C ${description} @${city} `;
//     weather === "Cloud" ?  weatherDiv.innerHTML = '<i class="fas fa-cloud"></i>'
//   : weather === "Clear" ?  weatherDiv.innerHTML = '<i class="fas fa-sun"></i>' 
//   : weather === "Haze"  ?  weatherDiv.innerHTML = '<i class="fas fa-smog"></i>'
//   : weather === "Rain"  ?  weatherDiv.style.backgroundImg = 'http://openweathermap.org/img/wn/10d@2x.png' : null;
}

function getWeather(lat,lon){
   const api = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
   .then(res=> res.json() )
   .then(json => {const city = json.name;
                  const temp = json.main.temp; 
                  const weather = json.weather[0].main;
                  const code = json.weather[0].icon;
                  const description = json.weather[0].description;
                  paintWeather(weather,city,temp,code,description);
                });
   
}

function saveCoords(coordsObj){
    localStorage.setItem("COORDS", JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   }
   const lat = coordsObj.latitude;
   const lon = coordsObj.longitude;
   saveCoords(coordsObj);
   getWeather(lat,lon);
}
function handleGeoFail(){
    console.log("access fail");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}
function loadCoords(){
    const loadedCoords = localStorage.getItem("COORDS");
    if(!loadedCoords){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

// function handleMouseLeave(){
//     greeting.innerHTML = originGreeting;
//     weatherDiv.removeEventListener("mouseleave", handleMouseLeave);
//     weatherDiv.addEventListener("mouseover", handleMouseOver);
// }
// function handleMouseOver(){
//     greeting.innerHTML = paintWeather();
//     weatherDiv.removeEventListener("mouseover", handleMouseOver)
//     weatherDiv.addEventListener("mouseleave", handleMouseLeave);
// }
function init(){
    loadCoords();
    // weatherDiv.addEventListener("mouseover", handleMouseOver);
    
}
init();
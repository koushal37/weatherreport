function disappear() {
    const welcome = document.querySelector(".wb");
    if (welcome && welcome.style.display != "none") {
        welcome.style.display = "none";
    }

    getWeather("Delhi", "d");
    getWeather("Mumbai", "m");
    getWeather("Chennai", "c");
    getWeather("Kolkata", "k");
}

document.querySelector(".wb").addEventListener('click', disappear);

const config = {
    baseURl: "https://api.openweathermap.org/data/2.5",
    apiKey: "7c9f6f52b36a70c16619da86c1927e68"
}


document.getElementById("sb").addEventListener("click", function(){
    const city = document.querySelector(".city").value;
    getWeather(city, "");
    document.getElementById("search-result").classList.remove("hidden")
    
})

async function getWeather(city, prefix = "") {
    
        const url = config.baseURl + "/weather?q=" + city + "&appid=" + config.apiKey + "&units=metric";
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

       
        document.getElementById(prefix + "cn").innerHTML = data.name;
        document.getElementById(prefix + "longitude").innerHTML = "Longitude: " + data.coord.lon;
        document.getElementById(prefix + "latitude").innerHTML = "Latitude: " + data.coord.lat;
        document.getElementById(prefix + "ww").innerHTML = "Weather: " + data.weather[0].description;
        document.getElementById(prefix + "t").innerHTML = "Temp: " + data.main.temp + "°C";
        document.getElementById(prefix + "tfl").innerHTML = "Feels like: " + data.main.feels_like + "°C";
        document.getElementById(prefix + "h").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.getElementById(prefix + "w").innerHTML = "Wind: " + data.wind.speed + " m/s";

        
        let bg = "images.jpeg"; 
        const desc = data.weather[0].description.toLowerCase();
        const main = data.weather[0].main.toLowerCase();

        if (desc.includes("rain")) {
            bg = "heavy rain with high thuderstorm.jpeg";
        } else if (desc.includes("cloud")) {
            bg = "cloudy image .jpg"; 
        } else if (main === "clear") {
            bg = "sunny image.jpg";
        } else if (desc.includes("smoke") || desc.includes("haze")) {
            bg = "moderate image.jpg";
        } else if (desc.includes("cold") || main === "snow") {
            bg = "cold weather.jpeg";
        }

       
       document.getElementById(prefix + "-img").src = "./images/" + bg
    
}

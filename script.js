
//weather api
const weatherApiKey = "bd5e378503939ddaee76f12ad7a97608";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(weatherApiUrl + city + `&appid=${weatherApiKey}`);

    //check for valid city name
    if (response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " mph";

        //check for weather type to display correct images
        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        localStorage.setItem("lastCity", city);
    }

    
}

//adding a function to the button
//search for city based on value in search box
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


window.addEventListener("load", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        checkWeather(lastCity);
    }
})

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if (inputBox.value === '') {
        alert("Please enter text!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

//remove and check on click
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

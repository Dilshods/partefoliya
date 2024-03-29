const api = {
    key:  "aeb9a648de45dc65828b34450d2ec0df",
    baseurel:"https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress",setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults (searchBox.value );
        console.log (searchBox.value) ;  
    }
}


function getResults(query){
    fetch(`${api.baseurel}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather)  => {
        return weather.json();

    }) 
    .then(displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);
    
    
    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round (weather.main.temp)}<span>°C</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let haylov = document.querySelector(".hay-lov");
    haylov.innerHTML = `${Math.round (weather.main.temp_min)  }°C /  ${Math.round (weather.main.temp_max)  }°C`;
}

function dateBuilder(s){
    let months = [
        "Yanvar",
        "Febral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentyabr",
        "Oktyabr",
        "Noyabr",
        "Dekabr",
    ];
    let days = [
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Payshanba',
        'Juma',
        'Shanba',
        'Yakshanba',
    ];

    let day = days [s.getDay()];
    let date = s.getDate();
    let month = months [s.getMonth()];
    let year = s.getFullYear();

    return  `${day}  ${date}  ${month}  ${year}`;
}
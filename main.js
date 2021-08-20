const key = 'f48adc860a0f1f073441f438207c55ca'
const url = 'https://api.openweathermap.org/data/2.5/'

const setQuery = (e) => {
  if(e.keyCode == '13') {
      getResult(searchBar.value);
  }
}

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
  fetch(query)
  .then(weather => {
    return weather.json()
  })
  .then(displayResult)
}

const searchBar = document.getElementById('searchBar')
if(searchBar){
searchBar.addEventListener('keypress',setQuery)
}

const displayResult = (result) =>{
  let city = document.querySelector('.city')
  if(city){
  city.innerText = `${result.name}, ${result.sys.country}`
  }

  let temp = document.querySelector('.temp')
  if(temp){
  temp.innerText = `${Math.round(result.main.temp)}°C`
  }

  let desc = document.querySelector('.desc')
  if(desc){
  desc.innerText = result.weather[0].description;
  }

  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = dateBuilder(now);

  let minmax = document.querySelector('.minmax')
  if(minmax){
  minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`
  }

  function dateBuilder (d) {
    let months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${date} ${month} ${day} ${year}`;
  }
}
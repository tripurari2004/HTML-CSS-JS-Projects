const userLocation = document.querySelector("#userlocation")
const converter = document.querySelector(".converter")
const weatherIcon = document.querySelector(".weatherIcon")
const temperature = document.querySelector(".temperature")
const feelsLike = document.querySelector(".feelsLike")
const description = document.querySelector(".description")
const date = document.querySelector(".date")
const city = document.querySelector(".city")


const Hvalue = document.querySelector("#Hvalue")
const Wvalue = document.querySelector("#Wvalue")
const SRvalue =  document.querySelector("#SRvalue")
const SSvalue = document.querySelector("#SSvalue")
const Cvalue = document.querySelector("#Cvalue")
const UVvalue = document.querySelector("#UVvalue")
const Pvalue = document.querySelector("#Pvalue")

const forecast = document.querySelector(".forecast")


const API_END = `https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&q=`
const API_Key = 'c0f1601711217b9726baeb81b6e2c01f'


async function findUserLocation(){
    try{
        forecast.innerHTML="";
        const data1  = await fetch(API_END+userLocation.value);
        const resp1 = await data1.json()
        console.log(resp1)
        city.innerHTML=resp1.name+", "+resp1.sys.country;
        weatherIcon.style.backgroundImage=`url(https://openweathermap.org/img/wn/${resp1.weather[0].icon}@2x.png)`

        const data2 = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${resp1.coord.lat}&lon=${resp1.coord.lon}&appid=${API_Key}`)
        const resp2 = await data2.json()
        console.log(resp2)
        temperature.innerHTML=tempConverter(resp2.current.temp);
        feelsLike.innerHTML="Feels Like "+tempConverter(resp2.current.feels_like);
        description.innerHTML=`<i class="fa-brands fa-cloudversify"></i> &nbsp;`+resp2.current.weather[0].description;
        const options = {
            weekday:"long",
            month:"long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            hours12:true
        }
        date.innerHTML = longDateTime(resp2.current.dt,resp2.timezone_offset,options);

        Hvalue.innerHTML = Math.round(resp2.current.humidity)+"<span>%</span>"
        Wvalue.innerHTML = Math.round(resp2.current.wind_speed)+"<span>m/s</span>"

        const options1 = {
            hour:"numeric",
            minute:"numeric",
            hours12:true
        }

        SRvalue.innerHTML = longDateTime(resp2.current.sunrise,resp2.timezone_offset,options1);
        SSvalue.innerHTML = longDateTime(resp2.current.sunset,resp2.timezone_offset,options1);
        Cvalue.innerHTML = resp2.current.clouds +"<span>%</span>"
        UVvalue.innerHTML = resp2.current.uvi
        Pvalue.innerHTML = Math.round(resp2.current.pressure)+"<span>hPa</span>"

        resp2.daily.forEach(weather =>{
            let div = document.createElement("div")
            const options2 ={
                weekday:"long",
                month:"long",
                day:"numeric"
            }
            let daily = longDateTime(weather.dt,0,options2).split(" at ")
            div.innerHTML= daily[0]
            div.innerHTML +=`<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"></img>`
            div.innerHTML += `<p class="forecast-desc">${weather.weather[0].description}</p>`
            div.innerHTML += `<span><span>${tempConverter(weather.temp.min)}</span></span>`
            forecast.append(div)
        })
        userLocation.value="";


    }catch(err){
        alert("Something went wrong ")
    }
}

function formatUnixTime(dtValue, offset , options={}){
    const date = new Date((dtValue + offset)*1000)
    return date.toLocaleTimeString([],{timeZone:"UTC", ...options})

}


function longDateTime(dtValue, offset , options){
    return formatUnixTime(dtValue, offset , options)
}

function tempConverter(temp){
    let tempValue = Math.round(temp)
    let message="";
    if(converter.value == "°C"){
        message=tempValue + "<span>" + " \xB0C</span>";
        
    }else{
        let far = (tempValue*9)/5+32;
        message=far + "<span>" + " \xB0F</span>"
    }

    return message;

}

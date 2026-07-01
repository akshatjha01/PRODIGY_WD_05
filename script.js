const apiKey = "3920f6ef8901ccbb302df798d0329340";

async function getWeather() {

    const city = document.getElementById("city").value;

        if(city===""){
                alert("Please enter a city");
                        return;
                            }

                                const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                                    try{

                                            const response=await fetch(url);
                                                    const data=await response.json();

                                                            if(data.cod!=200){

                                                                        alert("City Not Found");
                                                                                    return;

                                                                                            }

                                                                                                    document.getElementById("temperature").innerHTML=
                                                                                                            "🌡 Temperature : "+data.main.temp+" °C";

                                                                                                                    document.getElementById("condition").innerHTML=
                                                                                                                            "☁ Condition : "+data.weather[0].description;

                                                                                                                                    document.getElementById("humidity").innerHTML=
                                                                                                                                            "💧 Humidity : "+data.main.humidity+" %";

                                                                                                                                                    document.getElementById("wind").innerHTML=
                                                                                                                                                            "💨 Wind Speed : "+data.wind.speed+" m/s";

                                                                                                                                                                    document.getElementById("visibility").innerHTML=
                                                                                                                                                                            "👀 Visibility : "+(data.visibility/1000)+" km";

                                                                                                                                                                                    const sunrise=new Date(data.sys.sunrise*1000);

                                                                                                                                                                                            const sunset=new Date(data.sys.sunset*1000);

                                                                                                                                                                                                    document.getElementById("sunrise").innerHTML=
                                                                                                                                                                                                            "🌅 Sunrise : "+sunrise.toLocaleTimeString();

                                                                                                                                                                                                                    document.getElementById("sunset").innerHTML=
                                                                                                                                                                                                                            "🌇 Sunset : "+sunset.toLocaleTimeString();

                                                                                                                                                                                                                                    document.getElementById("weatherIcon").innerHTML=
                                                                                                                                                                                                                                            `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;



                                                                                                                                                                                                                                                    changeBackground(data.weather[0].main,data.wind.speed);

                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            catch(error){

                                                                                                                                                                                                                                                                    alert("Something went wrong.");

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        function changeBackground(weather,wind){

                                                                                                                                                                                                                                                                            let body=document.body;

                                                                                                                                                                                                                                                                                body.className="";

                                                                                                                                                                                                                                                                                    if(wind>12){

                                                                                                                                                                                                                                                                                            body.classList.add("storm");

                                                                                                                                                                                                                                                                                                    return;

                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                            switch(weather){

                                                                                                                                                                                                                                                                                                                    case "Clear":

                                                                                                                                                                                                                                                                                                                            body.classList.add("sunny");

                                                                                                                                                                                                                                                                                                                                    break;

                                                                                                                                                                                                                                                                                                                                            case "Clouds":

                                                                                                                                                                                                                                                                                                                                                    body.classList.add("cloudy");

                                                                                                                                                                                                                                                                                                                                                            break;

                                                                                                                                                                                                                                                                                                                                                                    case "Rain":

                                                                                                                                                                                                                                                                                                                                                                            body.classList.add("rain");

                                                                                                                                                                                                                                                                                                                                                                                    break;

                                                                                                                                                                                                                                                                                                                                                                                            case "Thunderstorm":

                                                                                                                                                                                                                                                                                                                                                                                                    body.classList.add("storm");

                                                                                                                                                                                                                                                                                                                                                                                                            break;

                                                                                                                                                                                                                                                                                                                                                                                                                    case "Snow":

                                                                                                                                                                                                                                                                                                                                                                                                                            body.classList.add("snow");

                                                                                                                                                                                                                                                                                                                                                                                                                                    break;

                                                                                                                                                                                                                                                                                                                                                                                                                                            case "Mist":

                                                                                                                                                                                                                                                                                                                                                                                                                                                    body.classList.add("fog");

                                                                                                                                                                                                                                                                                                                                                                                                                                                            break;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    default:

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            body.classList.add("default");

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
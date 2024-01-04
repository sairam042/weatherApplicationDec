const apiKey = "e05aaeeb5b0af6c2ee1371858357ccba";
let cities = [];

document.querySelector("#add").addEventListener("click", async () => {
    let cityName = document.querySelector("#cityName").value;
    if (cityName) {
        await addCity(cityName);
    }
});

async function addCity(cityName) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(api);
        const data = await response.json();

        const name = data.name;

        // Check if the city exists in the array
        let cityExists = false;
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].cityName === name) {
                cityExists = true;
                break;
            }
        }

        // If city doesn't exist, create a new city object and add it to the array
        if (!cityExists) {
            let city = {
                country: data.sys.country,
                cityName: data.name,
                weather: data.weather[0].main,
                temperature: data.main.temp,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                weatherDescription: data.weather[0].description
            };
            cities.push(city);

            // Sort cities by temperature
            cities.sort((cityA, cityB) => {
                return cityA.temperature - cityB.temperature;
            });

            addCityCards();

            console.log(cities);
        } else {
            console.log("City already exists in the list.");
        }
    } catch (error) {
        console.error("Error adding city:", error);
    }
}

function addCityCards() {
    
    let container = document.querySelector('.cardsContainer');
    container.innerHTML = ''; // Clear previous content

    cities.forEach(city => {
        // Create the elements for each city
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        let leftDiv = document.createElement("div");
        leftDiv.classList.add("left");

        let tempDiv = document.createElement("div");
        tempDiv.setAttribute("id", "temp");
        tempDiv.textContent = Math.round(city.temperature)+"°C";

        let humidDiv = document.createElement("div");
        humidDiv.setAttribute("id", "humid");

        let humidityDiv = document.createElement("div");
        humidityDiv.setAttribute("id", "humidity");
        humidityDiv.textContent = `Humidity: ${city.humidity}%`;

        let pressureDiv = document.createElement("div");
        pressureDiv.setAttribute("id", "pressure");
        pressureDiv.textContent = `... Pressure: ${city.pressure} hPa`;

        let locationDiv = document.createElement("div");
        locationDiv.setAttribute("id", "location");
        locationDiv.textContent = `${city.cityName}, ${city.country}`;

        // Construct the structure by appending elements
        cardDiv.appendChild(leftDiv);
        leftDiv.appendChild(tempDiv);
        leftDiv.appendChild(humidDiv);
        humidDiv.appendChild(humidityDiv);
        humidDiv.appendChild(pressureDiv);
        leftDiv.appendChild(locationDiv);

        container.appendChild(cardDiv);
    });
    
}


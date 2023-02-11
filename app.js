fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
        console.log(data.urls.full)
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        document.querySelector('.author').textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1502657877623-f66bf489d236?crop=entropy&cs=tinysrgb&fm=jpg
        &ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzU2OTgzNDM&ixlib=rb-4.0.3&q=80)`;
    })

fetch('https://api.coingecko.com/api/v3/coins/bitcoin/')
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong");
        }
        return res.json();
    })
    .then(data => {
        document.querySelector('.crypto-top').innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>`;

        document.querySelector('.crypto-container').innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>`
    })
    .catch(err => console.error(err))

function getTime() {
    document.querySelector('.time').textContent = new Date().toLocaleTimeString('en-us', {timeStyle: 'short'});
}

setInterval(getTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.querySelector('.weather').innerHTML = `
            <img src=${iconUrl} />
            <span class="weather-temp">${Math.round(data.main.temp)}º</span>
            <span class="weather-city">${data.name}</span>`
        })
        .catch(err => console.error(err))
});
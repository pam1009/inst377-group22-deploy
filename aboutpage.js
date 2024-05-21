// aboutpage.js

// Fetch data from SeatGeek API
axios.get('https://api.seatgeek.com/2/events')
    .then(response => {
        const seatGeekDataContainer = document.getElementById('seatGeekData');
        seatGeekDataContainer.textContent = `SeatGeek API Data: ${response.data}`;
    })
    .catch(error => {
        console.error('Error fetching data from SeatGeek API:', error);
    });

// Fetch data from Eventbrite API
axios.get('https://www.eventbriteapi.com/v3/events/search/')
    .then(response => {
        const eventbriteDataContainer = document.getElementById('eventbriteData');
        eventbriteDataContainer.textContent = `Eventbrite API Data: ${response.data}`;
    })
    .catch(error => {
        console.error('Error fetching data from Eventbrite API:', error);
    });

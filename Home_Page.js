document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});

function fetchEvents() {
    const apiUrl = 'https://api.seatgeek.com/2/events';
    const clientId = 'MzEwOTYyNjd8MTcxNTk3ODQ5Ny43NDIwNzk1'; 
    const eventbriteApiUrl = 'https://www.eventbriteapi.com/v3/events/search/';
    const eventbriteToken = '5HKTAQ2FHI7FDBKWAVS2';

    axios.get(`${apiUrl}?client_id=${clientId}`)
        .then(function (response) {
            if (response.data.events && response.data.events.length > 0) {
                const futureEvents = filterFutureEvents(response.data.events); // Filter events to get only future ones
                if (futureEvents.length > 0) {
                    displayEvents(futureEvents);
                } else {
                    console.log('No future events found');
                    document.querySelector('.container').innerHTML = '<p>No upcoming events available at the moment.</p>';
                }
            } else {
                console.log('No events found');
                document.querySelector('.container').innerHTML = '<p>No events available at the moment.</p>';
            }
        })
        .catch(function (error) {
            console.error('Error fetching events:', error);
            document.querySelector('.container').innerHTML = '<p>Error loading events. Please try again later.</p>';
        });
}

function filterFutureEvents(events) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero to start from the beginning of the day

    return events.filter(event => {
        const eventDate = new Date(event.datetime_local);
        return eventDate >= today;
    });
}

// Function to show the registration modal
function showRegisterModal() {
    var modal = document.getElementById('register-modal');
    modal.style.display = 'block';
    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    }

}

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const eventTitle = document.getElementById('modal-title').textContent; // Assuming this is set when the modal is open

    // Call function to update the UI with the new registration
    addRegisteredEventToList(name, eventTitle);

    // Provide feedback within the page
    const feedbackMessage = document.createElement('p');
    feedbackMessage.textContent = `Thank you for registering, ${name}! We will send details to ${email}.`;
    feedbackMessage.style.color = "green";
    document.querySelector('.modal-content').appendChild(feedbackMessage);

    setTimeout(() => {
        document.getElementById('register-modal').style.display = 'none'; // Close the modal after showing message
        feedbackMessage.remove(); // Remove the feedback message after a short delay
    }, 3000);

    document.getElementById('registration-form').reset(); // Reset form fields
});

function addRegisteredEventToList(name, eventTitle) {
    const registeredEventsList = document.getElementById('registered-events-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${name} registered for: ${eventTitle}`;

    // Create a delete button for each event
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn delete-btn'; // You can style this button as needed
    deleteBtn.onclick = function() { deleteEvent(listItem); };

    listItem.appendChild(deleteBtn);
    registeredEventsList.appendChild(listItem);
}

function deleteEvent(listItem) {
    listItem.remove();
    // Optionally, you could also call a backend API to remove the event from the database.
}



function displayEvents(events) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear previous entries

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${new Date(event.datetime_local).toLocaleDateString()}</p>
            <p>Location: ${event.venue.name}</p>
            <div class="buttons">
                <button class="btn" onclick="showDetailsModal(${JSON.stringify(event).replace(/"/g, '&quot;')})">More Details</button>
                <button class="btn" onclick="showRegisterModal()">Register</button>
            </div>
        `;
        container.appendChild(eventCard);
    });
}

function showDetailsModal(event) {
    document.getElementById('modal-title').textContent = event.title;
    document.getElementById('modal-date').textContent = `Date: ${new Date(event.datetime_local).toLocaleDateString()}`;
    document.getElementById('modal-location').textContent = `Location: ${event.venue.name}`;
    document.getElementById('modal-type').textContent = `Type: ${event.type}`;

    let performersList = event.performers.map(performer => performer.name).join(', ');
    document.getElementById('modal-performers').textContent = performersList ? `Performers: ${performersList}` : 'Performers: Information not available';

    var modal = document.getElementById('event-modal');
    modal.style.display = 'block';

    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setupCloseButtons();
});

function setupCloseButtons() {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
}

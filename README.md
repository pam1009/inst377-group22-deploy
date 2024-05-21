# INST377GroupProject: Community Events Exploration Platform

## Description
The Community Events Exploration Platform is a web-based application designed to help users discover and register for community events. It features an intuitive interface for browsing events, a detailed view for each event, and the ability to register online. The platform integrates with third-party APIs such as SeatGeek and Eventbrite to pull event data.

## Target Browsers
- **iOS**: Safari latest two versions
- **Android**: Chrome latest two versions
- **Desktop**: Chrome latest two versions, Firefox, Edge

## Features
- **Event Discovery**
- **Filtering**
- **Information**
- **Registration**

## Table of Contents
- Setup and Installation
- Project Structure
- API Integration
- Event Discovery
- Filtering
- Information
- Registration
- Testing
- Deployment
- Trouble Shooting

## Installation and Dependencies
- **Git**
- **Node.js**
-  **npm**

# Developer Manual
## Installation and Setup
To set up the Community Events Exploration Platform on your local development environment, follow these steps:

### Prerequisites:
- Node.js (v12.0 or higher recommended)
- npm (v6.0 or higher)

### Steps:
```bash
# Clone the repository
git clone https://github.com/mdiaby1/INST377GroupProject.git

## API Endpoints
The application utilizes several APIs to function correctly. Here are the endpoints used:

- **GET /api/events** - Fetches event data from SeatGeek and Eventbrite.
- **POST /api/register** - Registers a user for an event. Expects user name, email, and event ID.

## Known Bugs and Roadmap for Future Development
### Known Bugs:
- Date filters on the home page do not correctly filter past events.

### Roadmap:
- Allow users to submit and manage their own events.

# Full stack GraphQL airbnb clone 


## Getting started with local development 


### Prerequisites
* This project targets Node V14. Ensure you're using Node V14 by using something such as NVM. 
* Ensure you have Node / NPM installed.
* Ensure you have postgres setup and create a blank DB called `airbnb-clone`.
* This project only supports Mac / Linux. Any issues on Windows and you're on your own. 

### Backend: 
* Install postgres 
* Create a blank postgres database called `airbnb-clone`
* run `npm ci && npm run bootstrap` in the root of the project to install dependencies 
* copy the `.env.example ` to `.env` (`cp .env.example .env`).
* Fill out the `.env` file with your own values
* to start the backend: `cd src/abb-server && npm run watch`. This will compile Typesript down to common JS. Run `npm run dev` to start the backend server. 


### Frontend: 
* copy the `.env.example ` to `.env`. `cp .env.example .env`. 
* Fill out the `.env` file with your own values
* run `npm run dev` to start the frontend
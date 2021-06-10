# Full stack GraphQL airbnb clone 


## Getting started with local development 


### Prerequisites
* This project targets Node V14. Ensure you're using Node V14 by using something such as NVM. 
* Ensure you have Node / NPM installed.
* Ensure Postgres is installed & is running (see backend section for more details)
* Ensure Redis is installed & is running (see backend section for more details)
* This project only supports Mac / Linux. Any issues on Windows and you're on your own. 
* Ensure your postgres user has superuser access on the `abb-clone` DB

### Backend: 
* [Install postgres](https://www.postgresql.org/download/)
* [Install Redis (stable)](https://redis.io/download)
* Create a blank postgres database called `abb-clone`
* run `npm ci && npm run bootstrap` in the root of the project to install dependencies 
* copy the `.env.example ` to `.env` (`cp .env.example .env`).
* Fill out the `.env` file with your own values
* to start the backend: `cd src/abb-server && npm run watch`. This will transpile Typescript down to common JS. Run `npm run dev` to start the backend server. 


### Frontend: 
* copy the `.env.example ` to `.env`. `cp .env.example .env`. 
* Fill out the `.env` file with your own values
* run `npm run dev` to start the frontend


### Running backend Migrations 
* The backend contains 2 commands which are responsible for dealing with migrations. 
* The first one is responsible for generating a migration based on changes made to the `entities` folder. `typeorm migration:generate -n <NAME>`. 
* The second one is responsible for running the generated migrations. `typeorm migration:run`


### Deployment 
* TBD


### Inspirations 
* [benawad](https://github.com/benawad)
* [Ania Kubów](https://twitter.com/ania_kubow)

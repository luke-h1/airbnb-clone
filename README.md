# Full stack GraphQL airbnb clone 

A Fullstack GraphQL Airbnb Clone with Next.js

### Structure 
This project is made up of 2 areas that share code using <a href='https://lerna.js.org/' target="_blank">Lerna</a>

* Server - GraphQL, Typescript server 
* web - Next.js frontend website


## Getting started with local development 

### Prerequisites
* This project targets Node V14. Ensure you're using Node V14 by using something such as NVM. 
* Ensure you have Node / NPM installed.
* Ensure Postgres is installed & is running (see backend section for more details)
* Ensure Redis is installed & is running (see backend section for more details)
* Ensure your postgres user has superuser access on the `abb-clone` DB
* Run `npm ci && npm run bootstrap` in the root of the project to bootstrap the packages, install all their dependencies and link any cross-dependencies.

### Backend: 
* [Install postgres](https://www.postgresql.org/download/)
* [Install Redis (stable)](https://redis.io/download)
* Create a blank postgres database called `abb-clone`
* copy the `.env.example ` to `.env` (`cp .env.example .env`).
* Fill out the `.env` file with your own values
* to start the backend: `cd src/abb-server && npm run watch`. This will transpile Typescript down to common JS. Run `npm run dev` to start the backend server.
* create programatic access user on AWS and give it access to the s3 bucket you create
* create s3 bucket on AWS with public access allowed 

    ### Migrations 
    * The backend contains 2 commands which are responsible for dealing with migrations. 
    * The first one is responsible for generating a migration based on changes made to the `entities` folder. `typeorm migration:generate -n <NAME>`. 
    * The second one is responsible for running the generated migrations. `typeorm migration:run`
    * If you want to learn more about how TypeORM works checkout the [docs](https://typeorm.io/#/)
### Frontend: 
* copy the `.env.example ` to `.env`. `cp .env.example .env`. 
* Fill out the `.env` file with your own values
* run `npm run dev` to start the frontend

### Features 
* Create & delete properties 
* login/signup 
* upload user & property images 

### Inspirations 
* [benawad](https://github.com/benawad)
* [Ania Kubów](https://twitter.com/ania_kubow)

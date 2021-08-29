# Full stack GraphQL airbnb clone 

A Fullstack Airbnb Clone with Next.js & GraphQL

### Structure 
This project is made up of 2 areas that share code using <a href='https://lerna.js.org/' target="_blank">Lerna</a>

* api - GraphQL, Typescript API 
* client - Next.js frontend 

### Features 
* CRUD properties 
* login/signup
* delete user 
* upload user & property images 

### tech stack
* Node
* GraphQL 
* Next.js
* AWS S3 
* Apollo GraphQL (server-side)
* URQL GraphQL (client-side)

## Getting started with local development 

### Prerequisites
* This project targets Node V14. Ensure you're using Node V14 by using something such as NVM. 
* Ensure you have Node / NPM installed.
* Ensure Postgres is installed & is running (see backend section for more details)
* Ensure Redis is installed & is running (see backend section for more details)
* Ensure your postgres user has superuser access on the `abb-clone` DB
* Run `npm ci && npm run bootstrap` in the root of the project to bootstrap the packages, install all their dependencies and link any cross-dependencies.

### api: 
* [Install postgres](https://www.postgresql.org/download/)
* [Install Redis (stable)](https://redis.io/download)
* Create a blank postgres database called `abb-clone`
* copy the `.env.example ` to `.env` (`cp .env.example .env`).
* Fill out the `.env` file with your own values
* create programatic access user on AWS and give it access to the s3 bucket you create
* create s3 bucket on AWS with public access allowed 
* After you have done the above you will need to run the following (in seperate terminals) to start the backend:
    * Ensure whatever port you pick for the backend is free 
    * `npm run watch` - transpile Typescript to common JS 
    * `npm run dev` - start the backend server
   
    ### Migrations 
    * The backend contains 2 commands which are responsible for dealing with migrations. 
    * The first one is responsible for generating a migration based on the schema difference in `entities` vs what the current DB schema is. `typeorm migration:generate -n <NAME>`. 
    * The second one is responsible for running the generated migrations. `typeorm migration:run`
  
### Frontend: 
* copy the `.env.example ` to `.env`. `cp .env.example .env`. 
* Fill out the `.env` file with your own values
* run `npm run dev` to start the frontend


### Inspirations 
* [benawad](https://github.com/benawad)
* [Ania Kubów](https://twitter.com/ania_kubow)
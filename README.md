# Full stack GraphQL airbnb clone 

A Fullstack Airbnb Clone with Next.js & GraphQL

### Structure 
This project is made up of 1 area that is managed by using <a href='https://lerna.js.org/' target="_blank">Lerna</a>


* frontend - Next.js frontend / Prisma + TypegrapQL backend

### Features 
* CRUD listing 
* login/signup (firebase auth)
* upload listing images (cloudinary)
* mapbox 
* google places 
* geo-coding


### tech stack
* Node
* GraphQL 
* TypegraphQL
* Next.js
* Apollo GraphQL (server & client side)
* Mapbox 
* google places
* firebase 

## Getting started with local development 

### Prerequisites
* This project targets Node V14. Ensure you're using Node V14 by using something such as NVM. 
* Ensure you have Node / NPM installed.
* Ensure Postgres is installed & is running (https://www.postgresql.org/download/)
* Ensure your postgres user has superuser access on the `abb_clone` DB
* Run `npm ci && npm run bootstrap` in the root of the project to bootstrap the packages, install all their dependencies and link any cross-dependencies.
* Create a blank postgres database called `abb_clone`
* copy the `.env.example ` to `.env.local` (`cp .env.example .env.local`).
* Fill out the `.env.local` file with your own values
* create accounts for all of the things in the `.env.local` file    


### Inspirations 
* [benawad](https://github.com/benawad)
* [Ania Kubów](https://twitter.com/ania_kubow)
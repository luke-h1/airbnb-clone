# Stage 1 - build the code 
FROM node:14 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . . 
RUN npm run build

# stage 2 - build for prod 
FROM node:14 

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env.example . 
COPY .env.production .
COPY .env . 
COPY .env.production .env

RUN npm ci --production 

COPY --from=builder /usr/src/app/dist ./dist 

EXPOSE 4000

CMD ["npm", "run", "start"]
USER node

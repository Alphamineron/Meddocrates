# Meddocrates
`Meddocrates is a wordplay by combining Medicine and Hippocrates, Father of Modern Medicine`

A retail management software for a pharmacy, using Strapi and vanilla Frontend.




## Installation Instructions

Execute the following commands in terminal, make sure you have npm & node installed otherwise take a look here: [url](https://phoenixnap.com/kb/install-node-js-npm-on-windows).

**First**, you have to build the Backend on your device. Follow the following steps in a terminal window:

1. `git clone https://github.com/Alphamineron/Meddocrates.git`
2. `cd Meddocrates`
3. `cd backend`
4. `npm install`
5. `npm run strapi build`
6. `npm run strapi start`

> If you require username and password for entering into strapi admin dashboard then use these credentials - admin:password - respectively.

**Second**, for frontend hosting, please follow the following steps:

1. `cd Meddocrates`
2. `npm install`
3. `node server.js`

The system would inform you that the "Server is Starting" and "Server is listening on port: `5500`".

1. Open your browser of choice and go to the following URL: `http://localhost:5500/frontend/`
2. To ensure that the app works properly, please make sure that the backend server is running at URL: `http://localhost:1337/`


## Important Endpoints
Strapi Hosting (BACKEND): `http://localhost:1337/`

Meddocrates Hosting (FRONTEND): `http://localhost:5500/frontend/`

# 4Forces

4Forces is an online platform assisting aviators to practice aviation communication in English and master aviation knowledge needed in their exams. It also aims to bridges aviation learners with aviation training providers, providing them a platform to get connected.

## Screenshots

![App Screenshot](https://happyaviationenglish.sfo3.digitaloceanspaces.com/images/screenshot.png)

## Demo

[Video Demo](https://www.loom.com/share/1ff3fde0e3af4f75bdc52b3cf149cfa1)

[Link](https://fourforcesclient-9rqpz.ondigitalocean.app/)

## Installation

1. Clone this repo
2. Setup backend

```bash
  cd server
  npm i
  npm start
```

3. Setup frontend

```bash
  cd client
  npm i
  npm start
```


4. Set environment variables:

```bash
PORT = <PORT_NUMER>
SESSION_SECRET= <SECRET_KEY>
GOOGLE_CLIENT_ID = <YOUR_ID>
GOOGLE_CLIENT_SECRET = <YOUR_KEY>
GOOGLE_CALLBACK_URL = http://localhost:8080/auth/redirect/google
CLIENT_URL = http://localhost:3000
MONGODB_URL =<MONGO_URL>
```

## Tech Stack

**Client:** React.Js, React Hooks, React Router, Axios, Sass, Web API - SpeechSynthesis, React-Speech-Recognition

**Server:** NodeJS, Express, Nodemon, PassportJS, Passport-google-oauth20, Helmet, Morgan

**Storage:** Mongodb, Object store(Digital Ocean)


## Acknowledgement

- It has been an amazing 12 weeks in BrainStation. I want to give my sincere thanks to the awesome educators and teaching assitants as well as the career sucess team.

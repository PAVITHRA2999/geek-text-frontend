# Geek Text



Visit [geek-text.ga](https://www.geek-text.ga/) to see it live.

[![Netlify Status](https://api.netlify.com/api/v1/badges/667ba2ae-ce77-4c66-9c01-b0c2200f040a/deploy-status)](https://app.netlify.com/sites/geek-text-333/deploys)

<img alt="demo" src="demo.gif" height="auto"/>




## Requirements

node v16.10 (some later versions of node do not work with netlify dev)

## Running Locally

First, make sure the backend is already running locally and a server connection has been established successfully. For instructions on how to run the backend locally please go to [geek-text-backend](https://github.com/LeanetAlfonso/geek-text-backend).

Clone the repo

```
git clone https://github.com/LeanetAlfonso/geek-text-frontend.git
```

Change directory

```
cd geek-text-frontend
```

Install dependencies

```
yarn install
```

Add environment variable

```
touch .env
echo REACT_APP_BACKEND_URL={enter_backend_url_here} >> .env
```

Run app and netlify serverless functions

```
netlify dev
```

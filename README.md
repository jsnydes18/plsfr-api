# Playlist Surfer API

This portion of the system will receive requests from the UI. These requests will contain the user's query. In reponse the UI will recieve a request ID (reqId). This reqId is then used to pull the results found for that query.
1. Put request on /submit
2. Get results from /pull
3. NYI Repeat 2 until all results pulled

Playlist Surfer Worker will be churning through the querying, scraping, validation, and formating of the results.

# Requirements
Node >= v18.12.1
NPM >= v9.1.3

# Local
1. Install Depedencies
- Do NOT `npm install` as this rebuilds the `package-lock.json`
```
npm ci
```

2. Run Development Server
- Mock Endpoints only
```
npm run dev
```

3. Start LocalStack and Worker
TODO

# API Documentation
Refer to swagger at `/plsfr/` after you start the dev server
- Ex. http://localhost:8080/plsfr/
# Playlist Surfer API

# Local Setup
0. Requirements
```
node >= 18.12.1
npm >= 9.1.3
```

1. Install Depedencies
- Do NOT `npm install` as this rebuilds the `package-lock.json`
```
npm ci
```

2. Run Development Services
```
npm run dev
```

3. Begin Interacting
- Goto schema Queue.json for exact details
```
curl --location --request PUT 'http://localhost:8080/plsfr/queue/submit' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": $USER_QUERY
}'
```

```
curl --location --request GET 'http://localhost:8080/plsfr/queue/pull?reqId=$request_uuid'
```
# urls

Full-blown cerebellum sample app.

* Shared GET routes
* API implemented with express & mongoose
* Authentication with Google's oAuth 2
* Loads all configuration from ENV variables or .env

## get it running for development

1)

    npm install

2) Define following environment variables (or use .env)

- COOKIE_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL
- MONGO_HOST
- MONGO_PORT
- MONGO_DBNAME
- MONGO_USER
- MONGO_PASS

3)

    npm start
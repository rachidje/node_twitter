const app =require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const env = require(`../environment/${process.env.NODE_ENV}`)

app.use(session({
    secret: "Voici ma cle secrete",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 14 // cookie de 14 jours
    },
    store: MongoStore.create({
        mongoUrl: env.dbUrl,
        ttl: 60 * 60 * 24 * 14
    })
}))
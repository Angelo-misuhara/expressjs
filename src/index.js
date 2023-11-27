//importing the database
require('./database/database.js')
require('./strat/local.js')
//importing the express app
const express = require('express')
//importing the cookie-parser
const cookieParser = require('cookie-parser')
//importing the groceriesRoutes module 
const groceriesRoutes = require('./routes/groceries')
//importing the markterRoutes module
const mrktroutes = require('./routes/markets')
const authUser = require('./routes/auth')
//importing session
const session = require('express-session')
//making a express object(application)
const app = express();
//making a port(3001 localhost)
const PORT = 3001;

//importing passport
const passport = require('passport')


//middleware- function involve in the middle of two main functionality
//require for postman to be enabled to send post
// this is for json
app.use(express.json())
// this is for urlencoded
app.use(express.urlencoded())
//using express session
//initializing session
app.use(session(
 {
 secret: 'asduhagsdgbfgsiogfbsygbfdhfbvlsdbfb',
 resave: false,
 saveUninitialized:false
 }
))
//using the cookie parser
app.use(cookieParser())
app.use((req, res, next) => {
 console.log(req.method)
 //next is important to next to the next function or callback
 next()
})


//using the passport js
app.use(passport.initialize())
//giving a session to passport  js
app.use(passport.session())

app.use("/api/user",authUser)
app.use((req, res, next) => {
 if (req.session.user) {
  next();
 } else {
  console.log(req.session.user)
  res.status(401).send('unothorized')
 }
})



//setting a middle ware  for routes(groceriesRoutes)
//the api is a prefix route
app.use("/api/groceries", groceriesRoutes)
app.use("/api/market", mrktroutes)
//listening to the port that is created
//and making a callback function that logs a console
app.listen(PORT, () => console.log('running at port 3001'));


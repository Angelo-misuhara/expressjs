const { Router } = require('express');

const router = Router()
const {hashPass , comparePass} = require('../utils/helper')

//importing the database schema
//and calling it user
const user = require('../database/schemas/User')

const passport = require('passport')
const { authRegisterController } = require('../controllers/auth.js')




// router.post('/auth/login',async (req, res) => {
//   //distructuring the eq.body
//   const { email, password } = req.body

//   //cheking if the inputs are null
//   if (!email || !password) return res.send(401)
//   //finding the user email in DB
//   const userDB = await user.findOne({ email })
//   console.log(userDB)
//   //ccheking if the obejct is null
//   if (!userDB) return res.send(400)
  
//   //comparing the object to the raw pass
//   const isValid = comparePass(password, userDB.password)
  
//   //cheking if it is F OR T
//   if (isValid) {
//     req.session.user = userDB;
//     res.status(201).send('granteed')
//   } else {
//     res.status(401).send('not granteed')
//   }
  
// });

//login using passport
// the passport.authenticate('local') is a under the hood logic
//local is a name of js file
router.post('/login', passport.authenticate('local'), (req,res) => {
  console.log('logged in')
  res.sendStatus(201)
})



//getting the data from database
router.get('/register/get', async (req, res) => {
  //using the find() to retreive
  const response = await user.find()
  //sending response
  res.send(response)
})

//we created a post method for getting the user registration
//make the callback function to asynch to wait it before res it
router.post('/register', authRegisterController)


router.get('/discord', passport.authenticate('discord'), (req, res) => {
  console.log('auth discord')
  res.send(200)
})

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  console.log('auth discord')
  res.send(200)
})







module.exports =router
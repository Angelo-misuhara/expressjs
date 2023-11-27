//importing the strat las
const passport = require('passport')
const { Strategy } = require('passport-local')
const user = require('../database/schemas/User')
const { comparePass} = require('../utils/helper')

passport.serializeUser((user,done) => {
 console.log('serializing user')
 console.log(user)
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  console.log('deserializing user')
 console.log(id)
})

passport.use(
 new Strategy({
  usernameField:'email',
 }, async (email, password, done) => {
  console.log(email)
  console.log(password)

  try {
   if (!email || !password) throw new error('missin creds')
  const userDB = await user.findOne({ email })
  if (!userDB) throw new error('user not found')
  const isValid = comparePass(password, userDB.password)
  if (isValid) {
   console.log('auth successfully')
   done(null,userDB)
  } else {
   console.log('invalid auth')
    done(null,null)
  }
  } catch (err) {
   console.log(err)
  }
 })
)

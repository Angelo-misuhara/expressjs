//importing the strat las
const passport = require('passport')
const { Strategy } = require('passport-local')
const user = require('../database/schemas/User')
const { comparePass} = require('../utils/helper')


//this is the uder teh hood auth in passportjs

//serializing user
passport.serializeUser((user, done) => {
  console.log('serializing user')
  console.log(user)
  //sending done, with a null error and user.id
  done(null, user.id)
})

//deserializing user
//means if the user is already login
//and want to get req
//it will not require to login again
//we using async/await becuase of getting the mongodb
passport.deserializeUser(async(id, done) => {
  console.log('deserializing user') 
  console.log(id)
  try {
    const userID = await user.findById(id)
    //cheking if it is empty
    //the id is from the session
    if (!userID) throw new error('no user')
    console.log(userID)
    //sending a done with null errors,and userid
    done(null,userID)
  } catch (error) {
    consolelog(error)
    done(error,null)
  }
})


//this strategy is for login
passport.use(
  new Strategy({
    //this is for ensure that we get is a email
    usernameField: 'email',
    //we using asyn/await because we fetching data from database
  }, async (email, password, done) => {
    console.log(email)
    console.log(password)
    try {
      //cheking if it is a null(for email and password)
      //then throw a error mess
      if (!email || !password) throw new error('missin creds')
      //finding a email base on the user email in db
      const userDB = await user.findOne({ email })
      //cheking if it is a null
      //then throw an error
      if (!userDB) throw new error('user not found')
      //then we comapare the password that the user enters
      //and the password(hashed) from the database
      //this functions return a boolean
      const isValid = comparePass(password, userDB.password)
      if (isValid) {
        console.log('auth successfully')
        done(null, userDB)
      } else {
        console.log('invalid auth')
        done(null, null)
      }
    } catch (err) {
      console.log(err)
    }
  })
)

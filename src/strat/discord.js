const passport = require('passport');
const { Strategy } = require('passport-discord')
const discordUser = require('../database/schemas/DiscordUser')





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
    const dcUserID = await discordUser.findById(id)
    //cheking if it is empty
    //the id is from the session
    if (!dcUserID) throw new error('no user')
    console.log(dcUserID)
    //sending a done with null errors,and userid
    done(null,dcUserID)
  } catch (error) {
    console.log(error)
    done(error,null)
  }
})


//this is for trategy in discord login
passport.use(
  //defining the needs
  //parameter
  new Strategy(
    {
      clientID: '1180865760189493358',
      clientSecret: 'LOLv-UVf8N2tcjjgfImVfh9AKhUbUFpx',
      callbackURL: 'http://localhost:3001/api/user/discord/redirect',
      scope: ['identify'],
    },
    //verify function
    //in this function
    //create a user
    //found user
    async (accessToken, refreshToken, profile, done) => {
      try {for (let i = 0; i < 5; i++) {
  console.log('Hello world!');
}
for (let i = 0; i < 5; i++) {
  console.log('Hello world!');
}
for (let i = 0; i < 5; i++) {
  console.log('Hello world!');
}

        console.log(accessToken, accessToken)
        console.log(profile)

        //finding the same id in mongoDB
        const dcUser = await discordUser.findOne({ disordID: profile.id, });

        if (dcUser) {
          console.log('found user!')
          console.log(dcUser)
          return done(null, dcUser)
        } else {
          //creating a new user in db
          const newUser = await discordUser.create({
            disordID: profile.id,
          });
          console.log('created a new user')
          return done(null, newUser)
        }
      } catch (error) {
        return done(error, null)
      }

    })
)
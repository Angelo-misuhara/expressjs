const user = require('../database/schemas/User')

async function authRegisterController(req, res) {
 //distructuring the req body
 const { email } = req.body
 //finding the user post if it is already exist
 //finding by username and email(storing it in userDB)
 const userDB = await user.findOne({ $or: { email } })
 // checking it  if it is truthy( if it has duplicates)
 if (userDB) {
  //sending a 401 and a message
  res.status(401)
   res.send('user already exist')
 } else {
  const password = hashPass(req.body.password)
  console.log(password)
  //if it is not exist, we creating it in the DB
  const newUser = await user.create({ password, email },)
  //then saving it
  await newUser.save()
  //sending a response to the client side
  res.status(201).send('successfully created!')
 }
}

module.exports = {authRegisterController}
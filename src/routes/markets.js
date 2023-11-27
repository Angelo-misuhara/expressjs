//importing the express framework
const { Router } = require('express')

//creating a instance of router for  marketRouters
const router = Router()

//creating a array of object for supermarkets
const superMarkets = [
  {
    id: 1,
    'store': 'festival mall',
    'miles': 2.5
  },
  {
    id: 2,
    'store': 'divi mart',
    'miles': 2
  },
  {
    id: 3,
    'store': 'sm calamba',
    'miles': 6
  },
  {
    id: 4,
    'store': 'centro mall',
    'miles': 3
  }]

//this function is for the get
 router.get("", (req,res) => {
  res.send(superMarkets)
 })

 // this is for query request
router.get('/get', (req, res) => {
  //distructuring th e query request
  const { miles } = req.query
  //parsing it to int
  const parsemiles = parseInt(miles)
  //checking if the query is a int
  if (!isNaN(parsemiles)) {
    //filtering
    const filteredmiles = superMarkets.filter((store) => store.miles === parsemiles)
    console.log(req.params)
    //seding the response
    res.status(201).send(filteredmiles)
  }
  //if it is not a int(401)
  else {
    res.send(401,'BAD REQUEST')
  }
})

//this function is foer the post api
router.post('', (req, res) => {
  console.log(req.body)
  superMarkets.push(req.body)
  //sending a response if the psot is succesfull
  res.send(201)
})



//exporting the module
module.exports= router

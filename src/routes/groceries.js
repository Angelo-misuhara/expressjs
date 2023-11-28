//importing router
const { Router } = require('express')

//call the instance of router
const router = Router()

//adding a auth in the groceries route
router.use((req, res, next) => {
  console.log('req,inside the groceries router')
  console.log(req.user)
  //checking if the req.user has a laman
  if (req.user) {
    next();
  } else {
    console.log(req.user)
    res.status(401).send('unothorized')
  }
})


const groceerylist = [{
  itemId: '1',
  item: 'milk',
  quantity: 2,
},
{
  itemId: '2',
  item: 'gonut',
  quantity: 1,
},
{
  itemId: '3',
  item: 'champorado',
  quantity: 3,
}]

router.get('/get', (request, response) => {
  response.cookie('visited', true, {
    maxAge: 5184000000,
  })
  //status of req
  //send(json what every format you want)
  response.status(201).send(groceerylist);
})

//route parameter
// the :item is the route name
router.get('/item/:item', (req, res) => {
  console.log(req.cookies)
  console.log(req.params.item)
  const { item } = req.params
  //search if the item is in the gItem(grocery items)
  const groceriesItem = groceerylist.find((gItem)=> gItem.item === item)
  res.status(201).send(groceriesItem)
})

//post request
//creating new resource
// 1st- parameter-path
//2nd-parameter -handler-req handler
router.post('', (req,res) => {
 console.log(req.body)
 //pushing or adding the reqbody(post from the user or postman)
 groceerylist.push(req.body)
 //sending status code
 res.send(201)
})

//using get method with session
router.get('/shopping/cart', (req, res) => {
  //destructuring the req.session to cart
  const {cart} = req.session
  console.log(cart)
  //checking if the cart has no session
  if (!cart) {
    //sending the response
    res.send('you have no cart session')
  } else {
    //sending the carts(have a session)
    res.send(cart)
  }
})
//this post is with session for adding a cart
router.post('/shopping/cart/addItemCart', (req, res) => {

  //distructuring the item and quantity of the req body
  const { item, quantity } = req.body

  //putting that to the cartItem
  const cartItem = { item, quantity }

  //puttng the session to the cart
  const { cart } = req.session

  //checking the cart has a session
  if (cart) {
    //pushing or adding the session or item
    req.session.cart.items.push(cartItem)
  } else {
    //creating a array of session or creating a cart
    req.session.cart = {
      items: [cartItem],
   }
  }
  //sending response to the cient
  res.send(201)
  console.log(req.session.cart.items)
});



//making a export module to access
module.exports = router
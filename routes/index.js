var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
const User = require("../models/user");



 router.get('/home',(req,res,next)=>{
  var notLoggedIn='NOT LOGGED IN ';
   
   res.render('anasayfa/home',{notLoggedIn:notLoggedIn});
 });


 router.get('/logout',function(req,res,next){
  var notLoggedIn='NOT LOGGED IN ';
 
  res.render('anasayfa/home',{notLoggedIn:notLoggedIn});
}); 



 



/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err,docs){
    var productChunks=[];
    var chunkSize=3;
    for(var i=0; i<docs.length;i +=chunkSize){
      productChunks.push(docs.slice(i, i+ chunkSize));
    }
    User.find({})
    .then(users => {
    res.render('shop/index', { title: 'Fettah',products:productChunks,successMsg:successMsg, noMessages:!successMsg, users:users});
  });
});
});

router.get('/add-to-cart/:id',function(req,res,next){
    var productId=req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId,function(err,product){
      if(err){
        return res.redirect('/');
      }
      cart.add(product,product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
});

router.get('/reduce/:id',function(req,res,next){
  var productId=req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart=cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id',function(req,res,next){
  var productId=req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart=cart;
  res.redirect('/shopping-cart');
});

  router.get('/shopping-cart',function(req,res,next){
    if(!req.session.cart){
      return res.render('shop/shopping-cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice});

  });

  router.get('/checkout',isLoggedIn,function(req,res,next){
       if(!req.session.cart){
        return res.redirect('/shopping-cart');
      }
     var cart= new Cart(req.session.cart);
     var errMsg=req.flash('error')[0];
     res.render('shop/checkout',{total:cart.totalPrice,errMsg:errMsg, noError:!errMsg});
   });

   router.get('/buy',function(req,res){
     var dear='Fettah&Meryem';
    return res.render('shop/thankyou',{dear:dear});
});


    
    module.exports = router;
    
    function isLoggedIn(req, res, next) {
      if(req.isAuthenticated()) {
          return next();
      }
      req.session.oldUrl = req.url;
      res.redirect('/user/signin');
  }
  
var Product = require('../models/product');
var mongoose = require('mongoose');
//here we used the product in an array and show them on the product page.
mongoose.connect('mongodb://localhost:27017/shopping',
    { useUnifiedTopology: true,
        useNewUrlParser: true,
    });

var products = [
    new Product({
        imagePath:'https://cdn.akakce.com/apple/iphone-11-128-gb-z.jpg',
        title:'APPLE',
        description:'IPHONE 11',
        price:8000
    }),

    new Product({
        imagePath:'https://cdn.akakce.com/apple/iphone-x-64-gb-z.jpg',
        title:'APPLE',
        description:'IPHONE X',
        price:9300
    }),

    new Product({
        imagePath:'https://cdn.akakce.com/apple/iphone-se-2-2020-64-gb-z.jpg',
        title:'APPLE',
        description:'IPHONE SE 2',
        price:4600
    }),

new Product({
    imagePath:'https://cdn.akakce.com/samsung/samsung-galaxy-note-10-plus-256-gb-z.jpg',
    title:'SAMSUNG',
    description:'GALAXY NOTE 10 PLUS',
    price:7000
}),


new Product({
    imagePath:'https://cdn.akakce.com/samsung/samsung-galaxy-a71-128-gb-z.jpg',
    title:'SAMSUNG',
    description:'GALAXY A71',
    price:3750
}),

new Product({
    imagePath:'https://cdn.akakce.com/samsung/samsung-galaxy-note-20-ultra-256-gb-z.jpg',
    title:'SAMSUNG',
    description:'GALAXY NOTE 20 ULTRA',
    price:10390
}),


];
var done=0;
for(var i=0; i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done===products.length)
        {
            exit();
        }
    });
}
function exit(){
mongoose.disconnect();
}
console.log("Ürünleri database kaydettin");
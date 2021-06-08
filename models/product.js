var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//in this part we creates a Schema which is usable by mongo and it contains the products that we sell.

var schema = new Schema({
    imagePath : { type :String , required:true},
    title: { type :String , required:true},
    description: { type :String , required:true},
    price : { type :Number , required:true}
});

module.exports=mongoose.model('Product',schema);


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishListSchema = new Schema( {

        prodID: {type: String , required:true},
        title: {type: String , required:true},
        image: {type: String , required:true},
        price: { type: Number , required:true},
        inCart: {type: Boolean , required:true}

    },
    {
   timestamp:true,
});

const WishList = mongoose.model('WishList' , wishListSchema);

module.exports = WishList;
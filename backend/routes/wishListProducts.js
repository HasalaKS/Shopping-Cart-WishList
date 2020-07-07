const router = require('express').Router();
let WishList = require('../models/wishList.model');


//get wishList items from database
router.route('/').get(( req , res ) => {
    WishList.find()
        .then(wish_list => res.json(wish_list))
        .catch(err => res.status(400).json('Error: ' + err));
});


//add products to the wishList in database
router.route('/add').post(( req , res) => {

    const prodID = req.body.prodID;
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const inCart = false;

    const newProduct = new WishList( {
        prodID,
        title,
        image,
        price,
        inCart
    });

    newProduct.save()
        .then(() => res.json('New product added to the wish List ... ! '))
        .catch( err => res.status(400).json('Error: ' + err));
});


//delete products from wishList in database
router.route('/:id').delete(( req , res) => {
    WishList.findByIdAndDelete( req.params.id)
        .then(() => res.json( ' Product was deleted in wish list ... !'))
        .catch(err => res.status(400).json('Error: ' + err));
});


 /*router.route('/:id').get(( req , res) => {
    WishList.findById(req.params.id)
        .then(wish_list => res.json(wish_list))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(( req , res) => {
    WishList.findById( req.params.id)
        .then(wish_list => {
            wish_list.prodID = req.body.prodID;
            wish_list.title = req.body.title;
            wish_list.image = req.body.image;
            wish_list.price = req.body.price;
            wish_list.inCart = req.body.inCart;

            wish_list.save()
                .then(()=> res.json('Product is updated ... !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});*/

module.exports = router;
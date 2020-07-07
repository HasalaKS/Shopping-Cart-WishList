const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
    express.urlencoded({
        extended: false
    })
);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Wish_List',{useNewUrlParser:true , useUnifiedTopology: true})
    .then(()=> { console.log('Database is connected')},
        err => {
            console.log('cannot connect to the database ' + err )
        });

const wishListRouter = require('./routes/wishListProducts');

app.use('/wishList' , wishListRouter);

app.listen(port,() => {
    console.log(`Server is running on port : ${port} `);
});
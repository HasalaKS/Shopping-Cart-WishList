import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from "../contex";
import '../App.css';

class Product extends Component {

    render() {

        const {prodID , title , image , price , inCart , inWishList} = this.props.product;

        return (
            <div className="myCard">
               <div className="card" >
                   <ProductConsumer>
                       { (value) => (
                           <div className="img-container p-5" onClick={() => value.displayProductDetails(prodID)}>
                               <Link to="/details">
                                   <img src={image} alt="product" className="card-img-top" style={{width:'15rem' , height:'20rem'}}/><br/>
                               </Link>
                               <div className="text-center">
                                   <button disabled={inCart ? true : false}
                                           onClick={() => {value.addProductToCart(prodID); value.displayCartModel(prodID);}} className="btn">
                                       {inCart ? (<i className="fa fa-check my_icon" disabled/> )
                                           : <i className="fa fa-cart-plus my_icon"/>}
                                   </button>
                                   <button disabled={inWishList ? true : false}
                                           onClick={() => {value.addProductToWishList(prodID); value.displayWishListModel(prodID);}} className="btn">
                                       {inWishList ? (<i className="fa fa-heart my_icon" style={{color:'hotpink'}} disabled/> )
                                           : <i className="fa fa-heart-o my_icon"/>}
                                   </button>
                               </div>
                           </div>
                       )}
                   </ProductConsumer>
                   <div className="card-footer d-flex justify-content-between mt-0">
                       <p className="align-self-center mb-0"> {title}</p>
                       <h5 className="font-italic"> $ {price} </h5>
                   </div>
               </div>
            </div>
        );
    }
}

export default Product;
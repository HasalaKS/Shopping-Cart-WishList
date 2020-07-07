import React, {Component} from 'react';
import {ProductConsumer} from "../contex";

class ProductDetails extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                  const {prodID , title , image , price , inCart , inWishList}  = value.product_details;

                  console.log(value.product_details.title);
                  return(
                      <div className="container py-5">
                          <div className="row-cols-2 text-center">
                          <div className="card ">
                              <div className="img-container p-5 text-center">
                                  <img src={image} alt="product" className="card-img-top" style={{width:'15rem' , height:'20rem'}}/><br/>
                                  <div className="text-center">
                                      <button disabled={inCart ? true : false}
                                              onClick={() => {value.addProductToCart(prodID); value.displayCartModel(prodID);}} className="btn">
                                          {inCart ? (<i className="fa fa-check" disabled/> )
                                              : <i className="fa fa-cart-plus"/>}
                                      </button>
                                      <button disabled={inWishList ? true : false}
                                              onClick={() => {value.addProductToWishList(prodID); value.displayWishListModel(prodID);}} className="btn">
                                          {inWishList ? (<i className="fa fa-heart my_icon" style={{color:'hotpink'}} disabled/> )
                                              : <i className="fa fa-heart-o my_icon"/>}
                                      </button>
                                  </div>
                                  <div className="card-footer d-flex justify-content-between">
                                      <p className="align-self-center mb-0"> {title}</p>
                                      <h5 className="font-italic"> $ {price} </h5>
                                  </div>
                              </div>
                          </div>
                              </div>
                      </div>
                  )
                }}
            </ProductConsumer>
        );
    }
}

export default ProductDetails;
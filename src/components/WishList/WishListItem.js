import React, {Component} from 'react';
import {ProductConsumer} from "../../contex";
import {Link} from "react-router-dom";

class WishListItem extends Component {
    render() {

        const { _id , prodID , image , title , price , inCart } = this.props.product;

        return (
            <div className="myCard">
                <div className="card" >
                    <ProductConsumer>
                        { (value) => (
                            <div className="img-container p-3">
                                <Link to="/details">
                                    <img src={image} alt="product" className="card-img-top" style={{width:'12rem' , height:'15rem'}}/><br/>
                                </Link>
                                <div className="text-center">
                                    <button disabled={inCart ? true : false}
                                            onClick={() => {value.addProductToCart(prodID); value.displayCartModel(prodID); }} className="btn">
                                        {inCart ? (<i className="fa fa-check" disabled/> )
                                            : <i className="fa fa-cart-plus"/>}
                                    </button>
                                    <button className="btn" onClick={() => {value.removeFromWishList(_id , prodID);}}>
                                        <i className="fa fa-thumbs-o-down"/>
                                    </button>
                                    <button disabled= {true} className="btn">
                                        <i className="fa fa-heart my_icon" style={{color:'hotpink'}} disabled/>
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

export default WishListItem;
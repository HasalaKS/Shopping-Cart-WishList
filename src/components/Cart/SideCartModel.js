import React, {Component} from 'react';
import {ProductConsumer} from "../../contex";
import {Link} from "react-router-dom";
import '../../App.css';
import CartSlideItem from "./CartSlideItem";
import EmptyCart from "./EmptyCart";

class SideCartModel extends Component {
    render() {
        return (

            <ProductConsumer>
                {(value) => {
                    const { sideCartModel } = value;
                    const { cart } = value;

                    if(!sideCartModel){
                        return null;
                    }
                    else{
                        if( cart.length > 0){
                            return (
                                <div className="modelCss">
                                    <div className=" p-4 col-8 mx-auto col-md-4 col-lg-3 text-center bg-white">
                                        <div className="text-right">
                                        <Link to="/">
                                            <button className="btn" onClick={() => {value.removeSaidCardModel()}}>
                                                <i className="fa fa-close text-secondary my_icon"/>
                                            </button>
                                        </Link>
                                        </div>
                                        <h3>Your cart</h3>
                                        {cart.map( oneProduct => {
                                            return <CartSlideItem key={oneProduct.prodID}
                                                                  product={oneProduct}
                                            />;

                                        })}

                                        <div className="p-3">
                                            <h4> Total Price: $ {value.totalPrice}</h4>
                                        </div><br/>

                                        <div>
                                        <Link to="/cart">
                                            <button className="btn btn-info btn-block" onClick={() => {value.removeSaidCardModel()}} >
                                                View Cart
                                            </button><br/>
                                        </Link>
                                        <Link to="/checkout">
                                            <button className="btn my_button_gg btn-block" onClick={() => {value.removeSaidCardModel()}}>
                                                Check Out
                                            </button>
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else{
                            return (
                                <EmptyCart/>
                            )
                        }
                    }
                }}

            </ProductConsumer>
        );

    }
}

export default SideCartModel;
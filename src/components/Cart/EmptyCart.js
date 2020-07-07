import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {ProductConsumer} from "../../contex";
import "../../App.css"

class EmptyCart extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                return(
                    <div className="modelCss">
                        <div className=" p-4 col-8 mx-auto col-md-4 col-lg-3 text-center bg-white">
                            <div className="text-right">
                                <Link to="/">
                                    <button className="btn" onClick={() => {value.removeSaidCardModel()}}>
                                        <i className="fa fa-close text-secondary my_icon"/>
                                    </button>
                                </Link>
                            </div>
                            <h3>Your cart Is Empty</h3>
                            <br/><br/>
                            <i className="fa fa-cart-plus big_icon"/>

                        </div>
                    </div>
                )
                }
                }
            </ProductConsumer>

        );
    }
}

export default EmptyCart;
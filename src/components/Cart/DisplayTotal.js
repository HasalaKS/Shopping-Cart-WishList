import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class DisplayTotal extends Component {
    render() {
        const { discount , totalPrice , cartTotal , clearCart} = this.props.value;

        return (
            <React.Fragment>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-right">

                            <button className="btn my_button_r mb-3 px-5"
                                    type="button"
                                    onClick={() => clearCart()}>
                                Clear My Cart
                            </button>

                            <h5 className="font-italic">
                                <span> Sub Total :</span>
                                <strong> $ {cartTotal}</strong>
                                <br/><br/>
                                <span> Discount :</span>
                                <strong> $ {discount}</strong>
                                <br/><br/>
                                <span>  Total Price :</span>
                                <strong> $ {totalPrice}</strong>
                            </h5><br/><br/>
                            <Link to="/checkOut">
                                <button className="btn my_button_gg mb-3 px-5">
                                    Check Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DisplayTotal;
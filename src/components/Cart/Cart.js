import React, {Component} from 'react';
import {ProductConsumer} from "../../contex";
import CartList from "./CartList";
import DisplayTotal from "./DisplayTotal";

class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    { value => {
                        const { cart } = value;

                        if(cart.length > 0){
                            return(
                                <React.Fragment>
                                    <h1 className="text-center p-4"> My Cart</h1>
                                    <CartList value={value}/>
                                    <DisplayTotal value={value}/>
                                </React.Fragment>
                            )
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}

export default Cart;
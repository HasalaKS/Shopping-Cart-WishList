import React from 'react';
import CartListItem from "./CartListItem";

function CartList({value}) {

    const { cart } = value;

        return (

            <div className="container text-center d-none d-lg-block">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>
                            <div className="col-10 mx-auto col-lg-2">
                                <h5>Products</h5>
                            </div>
                        </th>
                        <th>
                            <div className="col-10 mx-auto col-lg-2">
                                <h5> Name</h5>
                            </div>
                        </th>
                        <th>
                            <div className="col-10 mx-auto col-lg-2">
                                <h5>Price</h5>
                            </div>
                        </th>
                        <th>
                            <div className="col-10 mx-auto col-lg-2">
                                <h5>Quantity</h5>
                            </div>
                        </th>
                        <th>
                            <div className="col-10 mx-auto col-lg-2">
                                <h5>Remove</h5>
                            </div>
                        </th>
                        <th>
                            <div className="col-10 mx-auto col-lg-2">
                                <h5>Total</h5>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {cart.map( oneProduct => {
                                    return <CartListItem
                                        key={oneProduct.prodID}
                                        product={oneProduct}
                                        value={value}/>
                                })}
                    </tbody>
                </table>

            </div>
        );

}

export default CartList;
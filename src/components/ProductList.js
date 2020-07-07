import React, {Component} from 'react';
import Product from "./Product";
import {ProductConsumer} from "../contex";

class ProductList extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <h1 className="text-center">Our Product</h1><br/>
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    return value.products.map( product => {
                                        return <Product key={product.prodID}
                                                        product = {product}
                                                        displayProductDetails={value.displayProductDetails}
                                                        addProductToCart={value.addProductToCart} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;
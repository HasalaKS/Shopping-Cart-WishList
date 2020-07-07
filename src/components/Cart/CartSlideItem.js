import React, {Component} from 'react';
import {ProductConsumer} from "../../contex";

class CartSlideItem extends Component {
    render() {

        const { image , title , price , count , discount } = this.props.product;

        return (
            <ProductConsumer>
                {(value) => {
                    return (
                        <div className="Card">
                            <br/>
                            <div className="card p-2">
                                <div className="row">
                                    <div className="p-3">
                                        <img src={image} alt="product" className="card-img-top" style={{width:'3rem' , height:'4rem'}}/>
                                    </div>
                                    <div className="col">
                                        <p>{title}</p>
                                        <p> Price : $ {price}</p>
                                        <p> Discount Per Item : {discount / 100}</p>
                                        <p> Items : {count}</p>
                                        <p> Total : { (count * price) - (count * (discount/100)) }</p>
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

export default CartSlideItem;
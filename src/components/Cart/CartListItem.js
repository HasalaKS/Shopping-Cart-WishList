import React , {Component} from 'react';

class CartListItem extends Component{

    render() {
        const {prodID, title, image, price, count, total} = this.props.product;
        const {incrementProductQty, decrementProductQty, removeFromCart} = this.props.value;

        return (
                    <tr>
                    <td>
                    <div>
                        <img src={image} className="img-fluid"  style={{width:'5rem' , height:'5rem'}} alt="product"/>
                    </div>
                    </td>
                    <td>
                    <div>
                        <br/><p> {title}</p>
                    </div>
                    </td>
                    <td>
                    <div>
                        <br/>
                        <p>{price}</p>
                    </div>
                    </td>
                    <td>
                    <div>
                        <div>
                            <div>
                                <br/>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <span type="button" className="btn mx-1 my_button_g" onClick={() =>decrementProductQty(prodID) }> - </span>
                                    <span type="button" className="btn mx-1 my_button_g"> { count } </span>
                                    <span type="button" className="btn mx-1 my_button_g" onClick={() =>incrementProductQty(prodID) }> + </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </td>
                    <td>
                    <div>
                        <br/>
                        <button className="btn" onClick={() => removeFromCart(prodID)}><i className="fas fa-trash text-secondary"></i></button>
                    </div>
                    </td>
                    <td>
                    <div>
                        <br/>
                        <p>$ {total}</p>
                    </div>
                    </td>
                    </tr>
        );
    }
}

export default CartListItem;
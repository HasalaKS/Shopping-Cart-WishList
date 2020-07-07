import React, {Component} from 'react';
import {ProductConsumer} from "../../contex";
import {Link} from "react-router-dom";
import '../../App.css';


class WishListModel extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {wishListModel , removeWishListModel } = value;
                    const {image , title , price} = value.modelProduct;

                    if( !wishListModel){
                        return  null;
                    }
                    else{
                        return(
                            <div className="modelCss">
                                <div className=" p-4 col-8 mx-auto col-md-4 col-lg-3 text-center bg-white">
                                    <div className="text-right">
                                            <button className="btn" onClick={() => removeWishListModel()}>
                                                <i className="fa fa-close text-secondary my_icon"/>
                                            </button>
                                    </div>
                                    <h3> Added To The WishList</h3>
                                    <img src={image} className="img-fluid p-2" alt="product" style={{width:'15rem' , height:'20rem'}}/>
                                    <h5 className="p-1">{title}</h5>
                                    <h5 className="text-muted">$ {price}</h5>

                                    <Link to="/wishList">
                                        <button className="btn btn-info" onClick = { () => removeWishListModel()}>
                                            See My WishList
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                }}
            </ProductConsumer>
        );
    }
}

export default WishListModel;
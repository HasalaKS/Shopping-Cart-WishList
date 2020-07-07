import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ProductConsumer} from "../contex";

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar bg-info navbar-dark px-sm-5">
                <ul className="navbar-nav align-items-center">
                    <li className=" nav-item ml-5">
                        <Link to="/" className="nav-link text-white">
                        <b>Product</b>
                        </Link>
                    </li>
                </ul>

                <ProductConsumer>
                    {value => {
                        const {cartNoOfProduct , wishListNoOfProduct , displaySaidCardModel}  = value;

                        return (
                            <div>
                                    <button className="bg-info border-0 " onClick={() => { displaySaidCardModel()}}>
                                        <i className="fa fa-cart-plus text-white">
                                            <span> { cartNoOfProduct}</span>
                                        </i>
                                    </button><span/>
                                <Link to="/wishList">
                                <button className="bg-info border-0 ">
                                    <i className="fa fa-heart text-white">
                                        <span> { wishListNoOfProduct}</span>
                                    </i>
                                </button>
                                </Link>
                            </div>
                        )
                    }}
                </ProductConsumer>

            </nav>
        );
    }
}

export default Navbar;
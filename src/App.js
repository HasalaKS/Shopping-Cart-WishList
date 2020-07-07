import React, {Component} from 'react';
import {Switch , Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart/Cart";
import WishList from "./components/WishList/WishList";
import Default from "./components/Default";
import ProductDetails from "./components/ProductDetails";
import CartModel from "./components/Cart/CartModel";
import WishListModel from "./components/WishList/WishListModel";
import SideCartModel from "./components/Cart/SideCartModel";
import CheckOut from "./components/CheckOut";


class App extends Component {
    render() {
        return (
           <React.Fragment>
               <Navbar/>

               <Switch>
                   <Route  exact path="/" component={ProductList}/>
                   <Route path="/cart" component={Cart}/>
                   <Route path="/wishList" component={WishList}/>
                   <Route path="/details" component={ProductDetails}/>
                   <Route path="/checkOut" component={CheckOut}/>
                   <Route component={Default}/>
               </Switch>

               <CartModel/>
               <WishListModel/>
               <SideCartModel/>

           </React.Fragment>
        );
    }
}

export default App;
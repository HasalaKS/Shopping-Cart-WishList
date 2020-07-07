import React, {Component} from 'react';
import {storeproduct} from "./data";
import axios from 'axios';

const ProductContext = React.createContext();
const  ProductConsumer = ProductContext.Consumer;

class ProductProvider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products:[],
            product_details:"",
            cart: [],
            wishList: [],
            cartModel: false,
            wishListModel: false,
            modelProduct: "",
            modelProduct2: "",
            discount: 0,
            cartTotal:0,
            totalPrice:0,
            cartNoOfProduct: 0,
            wishListNoOfProduct:0,
            sideCartModel: false,
        }
    }


    componentDidMount() {
        this.setProduct();
        this.setProductToWishList();
    };

    setProduct = () =>{

        //Todo :- get product details from database and set to the state

        let temProduct = [];
        storeproduct.forEach( product =>{
            const oneItem = {...product}
            temProduct = [...temProduct , oneItem]
        });

        this.setState( () => {
            return {products:temProduct};
        });
    };

    displayProductDetails = (prodID) => {
        const d_product = this.getProduct(prodID);

        this.setState( () => {
            return { product_details:d_product}
        });
    };


    //get product from products array by using Id
    getProduct = (prodID) => {
        const t_product = this.state.products.find(oneProduct => oneProduct.prodID === prodID);
        return t_product;
    };

    //get product from wishList array by using Id
    getProductWishList = (prodID) => {
        const tW_product = this.state.wishList.find(oneProduct => oneProduct.prodID === prodID);
        return tW_product;
    };


    /* ---------- Methods Related To The Cart ---------- */

    //add products to the cart
    addProductToCart = (prodID) => {
        let addCart_temProduct = [...this.state.products];
        const a_index = addCart_temProduct.indexOf(this.getProduct(prodID));
        const addCartProduct = addCart_temProduct[a_index];

        addCartProduct.inCart = true;
        addCartProduct.count = 1;
        addCartProduct.quantity = addCartProduct.quantity - 1;
        const productPrice = addCartProduct.price;
        addCartProduct.total = productPrice;

        this.setState(() => {
            return {
                products: addCart_temProduct,
                cart: [...this.state.cart , addCartProduct],
                discount: (this.state.discount + addCartProduct.discount/100),
                cartNoOfProduct: this.state.cartNoOfProduct + 1
            };
        }, () => {
            this.calculateTotal();
        });

         this.state.wishList.map( oneProduct => {

               let wId = oneProduct.prodID;

               if( wId === prodID){
                   let remCart_temProductWish = [...this.state.wishList];

                   const a_indexWish = remCart_temProductWish.indexOf(this.getProductWishList(prodID));
                   const remCartProductWish = remCart_temProductWish[a_indexWish];

                   remCartProductWish.inCart = true;

                   this.setState(() => {
                       return {
                           wishList: remCart_temProductWish
                       }
                   });
               }
           });

        // Todo :- update the database to update the product qty
    };


    //remove products from the cart
    removeFromCart = (prodID) => {
        let removeTemProduct = [...this.state.products];
        let removeTemCart = [...this.state.cart];

        removeTemCart = removeTemCart.filter(oneProduct => oneProduct.prodID !== prodID);

        const remove_index = removeTemProduct.indexOf(this.getProduct(prodID));
        let removeFromCartProduct = removeTemProduct[remove_index];

        const c_qty = removeFromCartProduct.count;

        removeFromCartProduct.inCart = false;
        removeFromCartProduct.count = 0;
        removeFromCartProduct.total = 0;
        removeFromCartProduct.quantity = removeFromCartProduct.quantity + c_qty;

        this.setState( () => {
            return {
                cart:[...removeTemCart],
                products: [...removeTemProduct],
                cartNoOfProduct: this.state.cartNoOfProduct -1
            };
        }, () =>{
            this.calculateTotal();
        });

        this.state.wishList.map( oneProduct => {

            let wId = oneProduct.prodID;

            if( wId === prodID){
                let remCart_temProductWish = [...this.state.wishList];

                const a_indexWish = remCart_temProductWish.indexOf(this.getProductWishList(prodID));
                const remCartProductWish = remCart_temProductWish[a_indexWish];

                remCartProductWish.inCart = false;

                this.setState(() => {
                    return {
                        wishList: remCart_temProductWish
                    }
                });
            }
        });

        // Todo :- update the database to update the product qty
    };

    //clear the cart
    clearCart = () => {
        let clearTemProduct = [...this.state.products];

        this.state.cart.map(oneProduct => {

            let id = oneProduct.prodID;

            const clear_index = clearTemProduct.indexOf(this.getProduct(id));
            let clearProduct = clearTemProduct[clear_index];

            const c_qty = clearProduct.count;

            clearProduct.inCart = false;
            clearProduct.count = 0;
            clearProduct.total = 0;
            clearProduct.quantity = clearProduct.quantity + c_qty;
        });

        this.setState(() => {
            return{
                cart: [],
                products: [...clearTemProduct],
                cartNoOfProduct: 0
            }
        },() => {
            this.calculateTotal();
        });

        if(this.state.wishList.length > 0) {

            let clrCart_temProductWish = [...this.state.wishList];

            this.state.wishList.map( oneProduct => {

                let id = oneProduct.prodID;

                const a_indexWish = clrCart_temProductWish.indexOf(this.getProductWishList(id));
                const clrCartProductWish = clrCart_temProductWish[a_indexWish];

                clrCartProductWish.inCart = false;

            });

            this.setState(() => {
                return {
                    wishList: clrCart_temProductWish
                }
            });
        };

        // Todo :- update the database to update the product qty
    };

    //increment the qty of product in the cart
    incrementProductQty = (prodID) => {
        let incrementCart = [...this.state.cart];
        const incrementProduct = incrementCart.find(oneProduct => oneProduct.prodID === prodID);

        const increment_index = incrementCart.indexOf(incrementProduct);
        const temProduct = incrementCart[increment_index];

        temProduct.quantity = temProduct.quantity - 1;
        temProduct.count = temProduct.count + 1;
        temProduct.total = temProduct.count * temProduct.price;

        this.setState( () => {
            return {
                cart:[...incrementCart],
                discount:(this.state.discount + temProduct.discount/100)
            }
        }, () =>{
            this.calculateTotal();
        });

        // Todo :- update the database to update the product qty
    };

    //decrement the qty of product in the cart
    decrementProductQty = (prodID) => {
        let decrementCart = [...this.state.cart];
        const decrementProduct = decrementCart.find(oneProduct => oneProduct.prodID === prodID);

        const decrement_index = decrementCart.indexOf(decrementProduct);
        const temProduct = decrementCart[decrement_index];

        temProduct.quantity = temProduct.quantity + 1;
        temProduct.count = temProduct.count - 1;

        if(temProduct.count === 0){
            this.removeFromCart(prodID);
        }
        else{
            temProduct.total = temProduct.count * temProduct.price;

            this.setState( () => {
                return {
                    cart:[...decrementCart],
                    discount:(this.state.discount - temProduct.discount/100)
                }
            }, () =>{
                this.calculateTotal();
            });
        }

        // Todo :- update the database to update the product qty
    };

    // calculate the total cart price
    calculateTotal = () => {
        let temTotal = 0;

        this.state.cart.map(oneProduct => (temTotal += oneProduct.total));
        const total = temTotal;
        const finalTotal = total - ( this.state.discount)

        this.setState( () => {
            return{
                cartTotal: total,
                totalPrice: finalTotal
            }
        });
    };

    //methods related to the cart models
    // display cart model
    displayCartModel = (prodID) => {
        const displayModelProduct = this.getProduct(prodID);
        this.setState( () => {
            return  {
                modelProduct: displayModelProduct,
                cartModel: true
            }
        });
    };

    //remove cart model
    removeCartModel = () => {
        this.setState( () => {
            return { cartModel: false}
        });
    };

    //display side cart model
    displaySaidCardModel = () => {
        this.setState(()=>{
            return { sideCartModel: true }
        })
    }

    //remove side cart model
    removeSaidCardModel = () => {
        this.setState(()=>{
            return { sideCartModel: false }
        })
    }


    /* ---------- Methods Related To The WishList ---------- */

    //get the product in wishList from the database
    setProductToWishList = () =>{
       axios.get('http://localhost:5000/wishList/')
            .then(response => {
                this.setState({wishList: response.data});

                let clearTemProduct = [...this.state.products];

                this.state.wishList.map(oneProduct => {
                    let id = oneProduct.prodID;

                    const clear_index = clearTemProduct.indexOf(this.getProduct(id));
                    let clearProduct = clearTemProduct[clear_index];

                    clearProduct.inWishList = true;
                });

                this.setState({
                    products: [...clearTemProduct],
                    wishListNoOfProduct: this.state.wishList.length
                });

            })
            .catch((error) => {
                console.log(error);
            });
    };

    //add products to wishList
    addProductToWishList = (prodID) => {

        const wProduct = this.getProduct(prodID);
        axios.post('http://localhost:5000/wishList/add' ,wProduct)
            .then(res=> console.log(res.data));

       this.setState(() => {
            return {
                wishList: [...this.state.wishList , wProduct]
            }
        });

        let addWishList_temProduct = [...this.state.products];
        const a_index = addWishList_temProduct.indexOf(this.getProduct(prodID));
        const addWishListProduct = addWishList_temProduct[a_index];

        addWishListProduct.inWishList = true;

        this.setState(() => {
            return {
                products: addWishList_temProduct,
                wishListNoOfProduct:  this.state.wishListNoOfProduct +1
            };
        }, () => {
            console.log(this.state);
        });
    };

    //remove products from wishList
    removeFromWishList = (_id , prodID) => {

        axios.delete('http://localhost:5000/wishList/'+_id)
            .then(res => console.log(res.data));

        this.setState({
            wishList:this.state.wishList.filter(el => el._id !== _id)
        });

      let removeTemProduct = [...this.state.products];

        const remove_index = removeTemProduct.indexOf(this.getProduct(prodID));
        let removeFromWishProduct = removeTemProduct[remove_index];

        removeFromWishProduct.inWishList = false;

        this.setState( () => {
            return {
                products: [...removeTemProduct],
                wishListNoOfProduct: this.state.wishListNoOfProduct -1
            };
        }, () =>{
            console.log(this.state);
        });
    };

    //clear the wishList
    clearWishList = () => {

        let clearTemProduct = [...this.state.products];

        this.state.wishList.map(oneProduct => {
            let _id = oneProduct._id;
            let id = oneProduct.prodID;

            axios.delete('http://localhost:5000/wishList/'+_id)
                .then(res => console.log(res.data));

            const clear_index = clearTemProduct.indexOf(this.getProduct(id));
            let clearProduct = clearTemProduct[clear_index];

            clearProduct.inWishList = false;
        });

        this.setState(() => {
            return {
                wishList:[],
                products: [...clearTemProduct],
                wishListNoOfProduct: 0
            }
        });
    };

    //Methods Related to the wishList models
    //display wishList model

    displayWishListModel = (prodID) => {

        const displayModelProduct = this.getProduct(prodID);
        this.setState( () => {
            return  {
                modelProduct: displayModelProduct,
                wishListModel: true
            }
        });
    };

    //remove wishList model
    removeWishListModel = () => {
        this.setState( () => {
            return { wishListModel: false}
        });
    };

    render() {
        return (
           <ProductContext.Provider value={{
               ...this.state ,
               displayProductDetails:this.displayProductDetails,
               addProductToCart: this.addProductToCart,
               addProductToWishList:this.addProductToWishList,
               displayCartModel:this.displayCartModel,
               removeCartModel:this.removeCartModel,
               displaySaidCardModel:this.displaySaidCardModel,
               removeSaidCardModel:this.removeSaidCardModel,
               displayWishListModel:this.displayWishListModel,
               removeWishListModel:this.removeWishListModel,
               displayEmptyWishListModel:this.displayEmptyWishListModel,
               removeEmptyWishListModel:this.removeEmptyWishListModel,
               incrementProductQty:this.incrementProductQty,
               decrementProductQty:this.decrementProductQty,
               removeFromCart:this.removeFromCart,
               calculateTotal: this.calculateTotal,
               clearCart:this.clearCart,
               removeFromWishList:this.removeFromWishList,
               clearWishList: this.clearWishList,

           }}>
               {this.props.children}
           </ProductContext.Provider>
        );
    }
}

export  {ProductProvider , ProductConsumer};
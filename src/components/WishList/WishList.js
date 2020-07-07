import React, {Component} from 'react';
import EmptyWishList from "./EmptyWishList";
import WList from "./W_List";
import {ProductConsumer} from "../../contex";

class WishList extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    { value => {
                        const { wishList } = value;

                            if( wishList.length > 0){
                                return(
                                    <React.Fragment>
                                        <h1 className="text-center p-4"> My WishList</h1>
                                        <WList value={value}/>
                                    </React.Fragment>
                                )
                            }
                            else{
                                return(
                                    <EmptyWishList/>
                                )
                            }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}

export default WishList;
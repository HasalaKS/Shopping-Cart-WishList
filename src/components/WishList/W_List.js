import React, {Component} from 'react';
import WishListItem from "./WishListItem";

class WList extends Component {
    render() {

        const { wishList  , clearWishList} = this.props.value;

          return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            {wishList.map(oneProduct => {
                                return <WishListItem key={oneProduct.prodID}
                                                product={oneProduct}
                                />;
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row text-right">
                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8">
                                <button className="btn my_button_r mb-3 px-5"
                                        type="button"
                                        onClick={() => clearWishList()}>
                                    Clear My WishList
                                </button>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        );
    }
}

export default WList;
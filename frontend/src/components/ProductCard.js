import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';

const ProductCard = (props) => {
    const{grid}= props;
    let location = useLocation();

  return <div className={' ${location.pathname == "/store" ? `col-${grid}` : "col-3"}'}>
    <Link className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
            <Link><img src="images/wish.svg" alt="wishlist" /></Link>
        </div>
        <div className="product-imge">
            <img src="images/feature-1.webp" alt="product image" />
        </div>
        <div className="product-details">
            <h6 className="brand">Tiem Sach Mua Thu</h6>
            <h5 className="product-title">A Book on Books</h5>
            <ReactStars count={5} size={24} value="3" edit={false} activeColor="#ffd700"/>
            <p className="price">$45.0</p>
        </div>
        <div className="action-bar position-absolute">
            <div className='d-flex flex-column'>
                <Link>
                    <img src="images/add-cart.svg" alt="addcart" />
                </Link>
                <Link>
                    <img src="images/view.svg" alt="view" />
                </Link>
            </div>
        </div>
    </Link>
  </div>
}

export default ProductCard
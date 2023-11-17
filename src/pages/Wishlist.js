import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Wishlistcard from '../components/Wishlistcard'

const Wishlist = () => {
  return (
    <>
        <Meta title={"Wishlist"}/>
        <BreadCrumb title="Wishlist"/>
        <div className="wishlist-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-3">
                        <Wishlistcard/>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Wishlist
import React from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  return (
    <>
      <Meta title={"Login"}/>
        <BreadCrumb title="Login"/>
        <section className="cart-wrapper home-wrapper-2 py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="cart-header d-flex justify-content-between align-items-center">
                  <h4 className='cart-col-1'>Product</h4>
                  <h4 className='cart-col-2'>Price</h4>
                  <h4 className='cart-col-3'>Quantity</h4>
                  <h4 className='cart-col-4'>Total</h4>
                </div>
                <div className="cart-data mb-2 d-flex justify-content-between align-items-center">
                  <div className='cart-col-1 gap-15 d-flex align-items-center'>
                    <div className='w-25'>
                      <img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro-leather/img/one/huawei-watch-3-pro-kv.png" alt="" className='img-fluid'/>
                    </div>
                    <div className='w-75'>
                      <p>Book title</p>
                      <p>Shop: </p>
                      <p>Version: White</p>
                    </div>
                  </div>
                  <div className='cart-col-2'>
                    0.99$
                  </div>
                  <div className='cart-col-3 d-flex align-items-center gap-15'>
                    <div><input className="form-control" type="number" min={1}/></div>
                    <div><AiFillDelete className='text-danger p-3 bg-secondary'/></div>
                  </div>
                  <div className='cart-col-4'>0.99$</div>
                </div>
                <div className="col-12 py-2 mt-4">
                  <div className="d-flex justify-content-between">
                  <Link to='/product'>Continute to Shopping</Link>
                  <div className='d-flex align-items-end flex-column' >
                    <h4>Subtotal: $100</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to="/checkout"className='button'> Checkout</Link>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Cart
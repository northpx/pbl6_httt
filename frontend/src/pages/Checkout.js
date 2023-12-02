import React from 'react'
import { Link } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'

const Checkout = () => {
  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Tiki</h3>
                <nav style={{"--bs-breadcrumb-divider": ">"}} aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li className="breadcrumb-item">
      <Link to="/cart" className='text-dark '>Cart</Link>
    </li>
    &nbsp;/
    <li className="breadcrumb-item active" aria-current="page">
      Information
    </li>
    &nbsp;/
    <li className="breadcrumb-item active">
      Shipping
    </li>
    &nbsp;/
    <li className="breadcrumb-item active" aria-current="page">
      Payment
    </li>
  </ol>
</nav>
                <h4 className="title">
                  Contact Information
                </h4>
              
                <form action="" className='d-flex gap-15 justify-content-between flex-wrap'>
                  
                  <div className='w-100'>
                    <input type="text" placeholder='Name' className='form-control' />
                  </div>
                  <div className='w-100'>
                    <input type="text" placeholder='Phone' className='form-control' />
                  </div>
                  <div className='w-100'>
                    <input type="text" placeholder='Email' className='form-control' />
                  </div>
                  <div className='w-100'>
                    <input type="text" placeholder='Address' className='form-control' />
                  </div>
                  <div className='w-100'>
                    <select name="" className='form-control form-select' id="">
                      <option value="" selected disabled>City</option>
                    </select>

                  </div>
                  <div className='flex-grow-1'>
                    <select name="" className='form-control form-select' id="">
                      <option value="" selected disabled>District</option>
                    </select>

                  </div>
                  <div className='flex-grow-1'>
                    <select name="" className='form-control form-select' id="">
                      <option value="" selected disabled>Ward</option>
                    </select>

                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className='text-dark'><BiArrowBack className='me-2'/>Return to Cart</Link>
                      <Link to="/cart" className="button">Next</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className='border-bottom py-4'>
                <div className="d-flex gap-10 mb-2 align-items-center ">
                <div className='w-75 d-flex gap-10'>
                  <div className='w-25 position-relative'>
                    
                    <img className="img-fluid"src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro-leather/img/one/huawei-watch-3-pro-kv.png" alt="" /></div>
                    <div>
                  <div className="title">Watch</div>
                  <p>1</p>
                </div>
                </div>
                
                <div className='flex-grow-1'>
                  <h5>$ 100</h5>
                  
                </div>
                </div>
              </div>
              <div className='border-bottom py-4'>
                <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='total'>Subtotal</p>
                    <p className='total-price'>$ 1000</p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-0 total'>Shipping</p>
                    <p className='mb-0 total-price'>$ 1000</p>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center py-4'>
                <h4 className='total'>Total</h4>
                <h5 className='total-pice'>$ 1000</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
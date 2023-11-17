import React from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import {AiOutlineHeart} from "react-icons/ai";


const Singleproduct = () => {
  const productImage ="data:image/jpeg;base64,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";
  const [orderedProduct, setorderedProduct] = useState(true);

    
  return (
    <>
    
      <Meta title={"Single Product"} />
      <BreadCrumb title="Privacy"/>
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <ReactImageMagnify {...{
      smallImage: {
          alt: 'Wristwatch by Ted Baker London',
          isFluidWidth: true,
          src: productImage
      },
      largeImage: {
          src: productImage,
          width: 2048,
          height: 1983
      }
  }} />
                </div>
                <div className="other-product-images d-flex flex-wrap gap-10">
                  <div>
                    <img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro-leather/img/one/huawei-watch-3-pro-kv.png" alt="" />
                  </div>
                  <div>
                    <img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro-leather/img/one/huawei-watch-3-pro-kv.png" alt=""  />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className='border-bottom'>
                <h3 className='title'>Book title</h3>
                <p className="price">$ 100</p>
                <div className="d-flex align-items-center gap-10">
                <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className='mb-0'>(2 Reviews)</p>
                </div>
                <a className='review-btn'href="#review">Write a Review</a>
                </div>
                <div className="py-3 border-bottom">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className='product-heading'>Categories:</h3>
                    <p className='product-data'>DFC</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className='product-heading'>Available:</h3>
                    <p className='product-data'>DFC</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className='product-heading'>Product Tag:</h3>
                    <p className='product-data'>DFC</p>
                  </div>

            
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className='product-heading'>Version:</h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">White</span>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className='product-heading'>Quantity:</h3>
                    <div className="d-flex flex-row gap-15 align-items-center">
                    <div className=''>
                      <input type="number" style={{width:"50px"}} name=''
                      min='1'
                      className='form-control'
                       />
                    </div>
                    <div className='d-flex align-items-center gap-15'>
                      <button className='button border-0' type='submit'>Add to Cart</button>
                      <button className='button border-0' type='submit'>Buy it now</button>
                    </div>

                    </div>
                    <div><a href=""><AiOutlineHeart className='fs-5 me-2'/>Add to wishlist</a></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <h4>Description</h4>
              <div className="bg-white p-3">
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias illum, nihil dolorum minima nesciunt atque in, eveniet explicabo mollitia dolore quod veniam nisi quibusdam ipsum repellendus quas recusandae exercitationem officiis.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id='review' className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
            <h3>Reivews</h3>
              <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4>Customer Reviews</h4>
                  <div className='d-flex gap-10 align-items-center'>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className='mb-0'>Based on 2 Reviews</p>
                  </div>
                </div>
                {
                  orderedProduct&&(
                    <div>
                  <a className='text-dark text-decoration-underline'>Write a review</a>
                </div>
                  )
                }

              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>
                <form action="" className='d-flex flex-column gap-15'>
                  <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={true}
                    activeColor="#ffd700"
                  />
                  </div>
                  <div>
                    <input type="text"
                    className='form-control'
                    placeholder='Name' />
                  </div>
                  <div>
                    <textarea name="" id="" cols="30" rows="4" className='w-100 form-control' placeholder='Comments'></textarea>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button className='button border-0'>Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className='mb-0'>Toan</h6>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  </div>
                
                  <p className='mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed debitis itaque ipsam. Rem sapiente, molestiae dolorem aliquid libero suscipit accusamus aliquam assumenda alias dolores cum illum quidem repudiandae odio cumque?</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Popular Products
              </h3>
            </div>
            <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          </div>
          
          
        </div>

      </section>
    </>
  )
}

export default Singleproduct
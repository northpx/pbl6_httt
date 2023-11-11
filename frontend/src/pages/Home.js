import React from 'react'
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative py-3">
                <img src="images/main-banner-1.jpg" className='img-fluid rounded-3'alt="main banner" />
                <div className="main-banner-content position-absolute">
                  <h4>50% Sale Off</h4>
                  <h5>Famous Author</h5>
                  <p>End in 1 hour</p>
                  <Link className='button'>Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img src="images/catbanner-01.jpg" className='img-fluid rounded-3'alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>50% Sale Off</h4>
                  <h5>Famous Author</h5>
                  <p>End in 1 hour</p>
                  
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-02.jpg" className='img-fluid rounded-3'alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>New arrival</h4>
                  <h5>Buy IPad air</h5>
                  <p>End in 1 hour</p>
                  
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-03.jpg" className='img-fluid rounded-3'alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>50% Sale Off</h4>
                  <h5>Famous Author</h5>
                  <p>End in 1 hour</p>
                  
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-04.jpg" className='img-fluid rounded-3'alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>50% Sale Off</h4>
                  <h5>Famous Author</h5>
                  <p>End in 1 hour</p>
                  
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between py-3">
              <div className="d-flex align-items-center gap-10 ">
                <img src="images/service.png" alt="services" />
                <div>
                  <h6>Free Shipping</h6>
                  <p className="mb-0">From all orders over $100</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10 ">
                <img src="images/service-02.png" alt="services" />
                <div>
                  <h6>
                    Daily Suprise Offers
                  </h6>
                  <p className="mb-0">Save upto 25%</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10 ">
                <img src="images/service-03.png" alt="services" />
                <div>
                  <h6>
                    Support 24/7
                  </h6>
                  <p className="mb-0">Shop with an expert</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10 ">
                <img src="images/service-04.png" alt="services" />
                <div>
                  <h6>
                    Affordable Prices
                  </h6>
                  <p className="mb-0">Get Factory Default price</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-10 ">
                <img src="images/service-05.png" alt="services" />
                <div>
                  <h6>
                    Secure Payments
                  </h6>
                  <p className="mb-0">100% Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Fiction</h6>
                    <p>2084 items</p>
                  </div>
                  <img src="images/fiction.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Nonfiction</h6>
                    <p>2450 items</p>
                  </div>
                  <img src="images/nonfiction.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>History</h6>
                    <p>1036 items</p>
                  </div>
                  <img src="images/history.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Young Adult</h6>
                    <p>3095 items</p>
                  </div>
                  <img src="images/young.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Art & Design</h6>
                    <p>930 items</p>
                  </div>
                  <img src="images/art.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>cooking</h6>
                    <p>569 items</p>
                  </div>
                  <img src="images/cooking.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Science</h6>
                    <p>460 items</p>
                  </div>
                  <img src="images/science.webp" alt="camera" />
                </div>
                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Romance</h6>
                    <p>1032 items</p>
                  </div>
                  <img src="images/romance.webp" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
      

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
      <section className="marquee-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className='d-flex'>
                <div className='mx-4 '>
                  <img src="images/brand-01.png" alt="Brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-02.png" alt="Brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-03.png" alt="Brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-04.png" alt="Brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-05.png" alt="Brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-06.png" alt="Brand" />
                </div>
                <div className='mx-4 w-25'>
                  <img src="images/brand-07.png" alt="Brand" />
                </div>
              </Marquee>  
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our leastes blogs</h3>
            </div>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>

          </div>
        </div>
      </section>
      
    </>
  )
}

export default Home
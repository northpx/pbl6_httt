import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard'

const Ourstore = () => {
  const {grid, setGrid}=useState(2);
  
  return (
  <>
    <Meta title={"Our Store"}/>
    
    <BreadCrumb title="Our Store"/>
    <div className="store wrapper home-wrapper-2 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-3">
            <div className='filter-card mn-3'>
              <h3 className="filter-title">
                Shop By Categories
              </h3>
              <div>
                <ul className='ps-0'>
                  <li>watch</li>
                  <li>watch</li>
                  <li>watch</li>
                  <li>watch</li>
                </ul>
              </div>
            </div>
            <div className='filter-card mn-3'>
              <h3 className="filter-title">
                Filter By
              </h3>
              <div>
                <h5 className="sub-title">Availabe</h5>
                <div>
                <div class="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" htmlFor=''>
    In Stock (1)
  </label>
  </div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
  <label className="form-check-label" htmlFor=''>
    Out of stock (0)
  </label>
</div>
</div>
                <h5 className="sub-title">Price</h5>
                <div className='d-flex align-items-center gap-10'>
                <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="From"/>
  <label htmlFor="floatingInput">From</label>
</div>
<div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput1" placeholder="To"/>
  <label htmlFor="floatingInput">To</label>
</div>
                

</div>
              </div>
            </div>
            <div className='filter-card mn-3'>
              <h3 className="filter-title">
                Product Tag
              </h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Headphone
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
              <div className='d-flex align-items-center gap-10'>
                <div className="mb-0 w-50">Sort by</div>
                <select name="" className='form-control form-select' id="">
                  <option value="manual">Featured</option>
                  <option value="best-selling" selected="selected">Best selling</option>
                  <option value="price-ascending">Low price first</option>
                  <option value="price-descending">High price first</option>
              
                </select>

              </div>
              <div className='d-flex align-items-center gap-10'>
                <p className="totalproducts mb-0">21 products</p>  
                <div className="d-flex gap-10 align-items-center grid">
                  <img onClick={() => {setGrid(4);}} src="images/gr3.svg" className="d-blcok img-fluid"alt="grid" />
                  <img onClick={() => {setGrid(1);}} src="images/gr.svg" className="d-blcok img-fluid"alt="grid" />
                </div>
              </div>
              </div>
            </div>
            <div className="product-list pb-5">
              <div className="d-flex row row-cols-lg-3">
                <ProductCard grid={grid}/>
                <ProductCard grid={grid}/>
                <ProductCard grid={grid}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Ourstore
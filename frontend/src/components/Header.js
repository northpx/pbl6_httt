import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs';
const Header = () => {
  return (
    <>
   <header className="header-top-strip py-3">
     <div className="container-xxl">
      <div className="row">
        <div className="col-6">
        <p className='text-white mb-0'>Book ecommerce</p>
        </div>
        <div className="col-6">
        <p className='text-end text-white mb-0'>Facebook: <a className='text-white' href="www.facebook.com/tiki"> www.facebook.com/tiki</a></p>
        </div>
      </div>
     </div>
   </header>
   <header className="header-upper py-3">
    <div className="container-xxl">
      <div className="row align-items-center">
        <div className="col-2">
          <h2>
            <Link className='text-white'>BookSell</Link>
          </h2>
        </div>
        <div className="col-6">
        <div class="input-group">
  <input type="text" className="form-control py-2" placeholder="Search Book" aria-label="Search Book" aria-describedby="basic-addon2"
  />
  <span className="input-group-text p-3" id="basic-addon2"><BsSearch className='fs.6'/></span>
</div>
        </div>
        <div className="col-4">
          <div className="header-upper-links d-flex align-items-center justify-content-end gap-15">
            
            <div>
              <Link to="/wishlist"className='d-flex align-items-center gap-10 text-white'>
                <img src="images/wishlist.svg" alt="wishlist" />
                <p className='mb-0'>Favorite <br/> wishlist</p>
              </Link>
            </div>
            <div>
              <Link to="/login"className='d-flex align-items-center gap-10 text-white'>
                <img src="images/user.svg" alt="user" />
                <p className='mb-0'>Login <br/> My Account</p>
              </Link>
            </div>
            <div>
              <Link to="/cart"className='d-flex align-items-center gap-10 text-white'>
                <img src="images/cart.svg" alt="cart" />
                  <div className="d-flex flex-column gap-10">
                    <span className="badge bg-white text-dark">0</span>
                    <p className='mb-0'>$ 500</p>
                  </div>
              
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
   </header>
   <header className="header-bottom py-3">
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <div className="menu-bottom d-flex align-items-center gap-30">
            <div>
            <div class="dropdown">
  <button className="btn btn-secondary dropdown-toggle bg-transparent text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Shop Category
  </button>
  <ul class="dropdown-menu">
    <li><Link className="dropdown-item " to="">Action</Link></li>
    <li><Link className="dropdown-item " to="">Another action</Link></li>
    <li><Link className="dropdown-item " to="">Something else here</Link></li>
  </ul>
</div>
            </div>
            <div className="menu-links">
              <div className="d-flex align-items-center gap-15">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/store">Our Store</NavLink>
                <NavLink to="/blog">Blogs</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </header>
   </>
  )
}

export default Header
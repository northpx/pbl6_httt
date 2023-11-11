import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {BsFacebook, BsYoutube} from 'react-icons/bs'

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
            <div class="input-group">
  <input type="text" className="form-control py-1" placeholder="Your email" aria-label="Your email" aria-describedby="basic-addon2"
  />
  <span className="input-group-text p-2" id="basic-addon2">Subscribe</span>
</div>
            </div>
          </div>
        </div>
        </footer>
      <footer className='py-3'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className='text-white mb-4'>Contact Us</h4>
              <div>
                <address className='text-white fs-6'>
                  Da Nang University of Technology
                </address>
                <a href="tel: 123 456 789" className='mt-4 d-block mb-1 text-white'>
                  123 456 789
                </a>
                <a href="mail: dut@gmail.com" className='mt-4 d-block mb-0 text-white'>
                  dut@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a href=""><BsFacebook className='text-white fs-4'/></a>
                  <a href=""><BsYoutube className='text-white fs-4'/></a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Information</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Fiction</Link>
                <Link className='text-white py-2 mb-1'>Nonfiction</Link>
                <Link className='text-white py-2 mb-1'>Kids</Link>
                <Link className='text-white py-2 mb-1'>eBooks</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Account</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>About Us</Link>
                <Link className='text-white py-2 mb-1'>FAQ</Link>
                <Link className='text-white py-2 mb-1'>Contact</Link>
                
              </div>
            </div>
            <div className="col-2">
              <h4 className='text-white mb-4'>Quick Link</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Fiction</Link>
                <Link className='text-white py-2 mb-1'>Nonfiction</Link>
                <Link className='text-white py-2 mb-1'>Kids</Link>
                <Link className='text-white py-2 mb-1'>eBooks</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">&copy; {new Date().getFullYear()}; Powered by PBL6</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
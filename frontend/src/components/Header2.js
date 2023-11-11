import React from 'react'
import { BsSearch } from 'react-icons/bs';

const Header2 = () => {
  return (
    <>
        <header className="main-header py-3">
            <div className="container-xxl">
                <div className="row align-item-center">
                    <div className="col-1">
                        <a href="/" className="navbar-brand">
                            <img src="images/Logo-1.png" alt="Logo Tiki" width="100%" />
                        </a>
                    </div>
                    <div className="col-6">
                        <div class="input-group">
                            <input
                            type="text"
                            className="form-control py-2"
                            placeholder="Search Book"
                            aria-label="Search Book"
                            aria-describedby="basic-addon2"/>
                            <span className="input-group-text p-3" id="basic-addon2"><BsSearch className='fs.6'/></span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    
    </>
  )
}

export default Header2
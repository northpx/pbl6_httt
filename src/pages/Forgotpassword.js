import React from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';

const Forgotpassword = () => {
  return (
    <>
    <Meta title={"Forgot Password"}/>
        <BreadCrumb title="Forgot Password"/>
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="login-card">
                        <h3 className='text-center'>Reset your password</h3>
                        <form action="" className='d-flex flex-column gap-15'>
                            <div>
                                <input type="email" name="email" placeholder='Email' className="form-control text-dark" />
                            </div>
                            
                            <div className='d-flex flex-column'>
                                
                           
                                <div className="d-flex justify-content-center flex-column gap-15 align-items-center">
                                    <button className="button border-0 "type='submit'>Submit</button>
                                    <Link to='/login'>Cancel</Link>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
</>

  )
}

export default Forgotpassword
import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
        <Meta title={"Login"}/>
        <BreadCrumb title="Login"/>
        <div className="login-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="login-card">
                        <h3 className='text-center'>Log in</h3>
                        <form action="" className='d-flex flex-column gap-15'>
                            <div>
                                <input type="email" name="email" placeholder='Email' className="form-control text-dark" />
                            </div>
                            <div>
                                <input type="password" name="password" placeholder='Password'  className="form-control" />
                            </div>
                            <div className='d-flex flex-column'>
                                <Link to='/forgot-password'>Forgot Password</Link>
                                <Link to='/signup'>Sign Up</Link>
                                <div className="d-flex justify-content-center gap-15 align-items-center">
                                    <button className="button border-0 ">Login</button>
                                    
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

export default Login
import React from 'react'
import { Link } from 'react-router-dom';

const BlogCard = () => {
  return <div className="col-3">
    <div className="blog-card">
        <div className="card-image">
            <img src="images/blog-1.jpg" className='img-fluid' alt="blog" />
        </div>
        <div className="blog-content">
            <p className='date'> 1 dec, 2023</p>
            <h5 className="tittle">How to read more book</h5>
            <p className="desc">read more book is the hard habit to practice but it's not impossible thing to do. In this blog we'll discover how to read more book </p>
            <Link to="/" className="button">Read more</Link>
        </div>
    </div>
  </div>
};
export default BlogCard
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactStars from 'react-rating-stars-component';
import { Store } from '../Store';
// import { v4 as uuidv4 } from 'uuid';

const ProductCard = (props) => {
  const { product } = props;
  const [cartItems, setCartItems] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const { userInfo } = state;

  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(product.expiryDiscount)
  );
  const [discount, setDiscount] = useState(product.discount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userId;
        if (userInfo) {
          userId = userInfo._id;
          const result = await axios.get(`/api/v2/user/${userId}/cart-items`);
          setCartItems(result.data);
        } else {
          // const sessionId = uuidv4();
          // userId = sessionId;
        }
      } catch (error) {}
    };

    fetchData();
  }, [userInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining(product.expiryDiscount);
      setTimeRemaining(remainingTime);
      if (remainingTime === 'Discount expired') {
        setDiscount(0);
      } else {
        setDiscount(product.discount);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [product.expiryDiscount, product.discount]);

  // Function to calculate time remaining
  function calculateTimeRemaining(expiryDiscount) {
    const now = new Date().getTime() / 1000; // Get current timestamp in seconds

    const timeDifference = expiryDiscount - now;
    if (timeDifference <= 0) {
      return 'Discount expired';
    }

    const days = Math.floor(timeDifference / (60 * 60 * 24));
    const hours = Math.floor((timeDifference % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    const seconds = Math.floor(timeDifference % 60);

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  const addToCartHandler = async (item) => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    const existItem =
      cartItems.length > 0 ? cartItems.find((x) => x.book === item._id) : null;
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await axios.get(`/api/v2/books/slug/${item.slug}`);

    // Check if the product is in stock
    if (data.data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    const result = await axios.post(`/api/v2/user/update-cart`, {
      bookId: item._id,
      quantity,
      userId: userInfo._id,
    });
    setCartItems(result.data);
  };

  return (
    <>
      <div className="product-card position-relative">
        <Link to={`/book/${product.slug}`}>
          <div className="product-imge">
            <img
              src={product.image}
              alt={product.name}
              style={{ height: '400px' }}
            />
          </div>

          <div className="product-details">
            <h6 className="brand">{product.shop.name}</h6>
            <h5 className="product-title">{product.book.title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={product.ratings}
              edit={false}
              activeColor="#ffd700"
            />
            {discount > 0 ? (
              <>
                <Card.Text>
                  <Row>
                    <Col>
                      <span style={{ textDecoration: 'line-through' }}>
                        ${product.price}
                      </span>{' '}
                      <strong>
                        ${(product.price * (1 - discount / 100)).toFixed(2)}
                      </strong>
                    </Col>
                    <Col xs="auto">
                      <Badge bg="danger" className="float-right">
                        {discount}% - {timeRemaining.days}d{timeRemaining.hours}
                        h{timeRemaining.minutes}m{timeRemaining.seconds}s
                      </Badge>
                    </Col>
                  </Row>
                </Card.Text>
              </>
            ) : (
              <>
                <Card.Text>${product.price}</Card.Text>
              </>
            )}
            <Card.Text>Sold: {product.sold}</Card.Text>
          </div>
        </Link>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to Cart</Button>
        )}
      </div>
    </>
  );
};

export default ProductCard;

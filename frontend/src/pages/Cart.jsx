import {
  faCartShopping,
  faIndianRupeeSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from 'antd';
import CartItem from './CartItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './SmallSpinner';
import {
  activerestro,
  selectrestro,
  addItem,
  removeItem,
  selectMenu,
  initialCart,
  Placeorder,
  clearCart,
} from '../cartSlice';
import { Getlocation, Alert, loading, userLogout } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import LoadingButton from './Loading-Button';

function Cart() {
  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(function () {}, []);
  return (
    <>
      {state.cartitems.length ? (
        <div>
          <div className='flex justify-between mt-10'>
            <Button
              type='text'
              className='text-xl h-[40%] underline'
              onClick={() => {
                navigate(`/restaurants/:${state.selectedRestaurant}`);
              }}
            >
              &larr;<span className='underline'>Back to Menu</span>
            </Button>
            <span className='text-5xl'>Your Cart</span>
            <Button
              type='text'
              className='text-xl'
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              <span className='ml-2'> Empty Cart</span>
            </Button>
          </div>

          <div className='flex flex-col items-center mt-10'>
            {/* <CartItem />
            <CartItem />
            <CartItem /> */}
            {state.cartitems.map((el) => (
              <CartItem key={el.itemid} el={el} />
            ))}
            <div className='h-[5rem] w-[30%] flex justify-between  items-center border-b-2 border-black pl-2 pr-2 bg-white'>
              <span className='text-2xl'>Total Bill :</span>
              <span className='text-2xl'>
                <FontAwesomeIcon icon={faIndianRupeeSign} /> {state.totalcost}
              </span>
            </div>
            <div className='h-[5rem] w-[30%] flex justify-between bg-white'>
              <span className='text-2xl '>Deliver to :</span>
              <span></span>
              {Object.keys(user.location).length ? (
                <span className='text-xl  ml-16'>
                  {user.location.display_name}
                </span>
              ) : user.isLoading ? (
                <LoadingButton />
              ) : (
                <Button
                  type='text'
                  size='large'
                  className='text-2xl bg-green-500 mt-2'
                  onClick={() => dispatch(Getlocation())}
                >
                  Grant Location
                </Button>
              )}
            </div>
            <div className='h-[5rem] w-[30%]  flex justify-center bg-white'>
              <Button
                type='text'
                size='large'
                className='mt-5 bg-green-600 text-xl text-white'
                onClick={() => {
                  if (!Object.keys(user.location).length) {
                    dispatch(Alert({ message: 'Grant location access first' }));
                  } else {
                    navigate('/order');
                  }
                }}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center flex-col text-2xl'>
          <img width='200px' src='../public/cart.png' />
          <span>The cart is empty ,add some items to it</span>
          <Button
            type='text'
            size='large'
            className='mt-5 bg-orange-500 text-xl text-white pb-10'
            onClick={() => {
              navigate('/restaurants');
            }}
          >
            View Restaurants
          </Button>
        </div>
      )}
    </>
  );
}

export default Cart;

import {
  faCircleCheck,
  faIndianRupeeSign,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderItem from './OrderItem';
import { Button, Checkbox, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const starsArray = Array.from({ length: 5 }, (_, index) => (
  <FontAwesomeIcon
    key={index}
    icon={faStar}
    className='ml-3 text-3xl hover:text-amber-400 cursor-pointer'
  />
));
import { Fetchorder, Placeorder } from '../cartSlice';
import { useNavigate } from 'react-router-dom';
function OrderDashBoard() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
  };
  // useEffect(
  //   function () {
  //     if (localStorage.getItem('orderid')) {
  //       dispatch(Fetchorder(localStorage.getItem('orderid')));
  //     }
  //     if (!localStorage.getItem('orderid')) {
  //       console.log('it runs');
  //       dispatch(Placeorder());
  //     }
  //     // dispatch(Placeorder());
  //     console.log(state.orderdata);
  //   },
  //   [state.orderdata, dispatch]
  // );
  useEffect(
    function () {
      if (localStorage.getItem('orderid')) {
        console.log('hello');
        dispatch(Fetchorder(localStorage.getItem('orderid')));
      }
      if (!localStorage.getItem('orderid')) {
        console.log('it runs');
        dispatch(Placeorder());
      }
    },
    [dispatch]
  );
  // return <div>Hello</div>;
  useEffect(
    function () {
      if (!user.Loggedin) navigate('/login');
    },
    [user.Loggedin]
  );
  return (
    <>
      {Object.keys(state.orderdata).length !== 0 ? (
        <div className='flex justify-center  '>
          <div className=' w-[80%] flex flex-col items-center bg-white  pb-5'>
            <span className='text-5xl mt-5 ml-5 text-green-500'>
              <FontAwesomeIcon icon={faCircleCheck} /> Your Order Has been
              Placed
            </span>
            <span className='text-3xl mt-5 ml-5 font-semibold'>
              {new Date().toDateString()}
            </span>
            <div className='flex w-[100%] justify-around'>
              <span className='text-2xl mt-5 ml-5 font-bold'>
                OrderId : {state.orderdata._id}
              </span>
              <span className='text-2xl mt-5 ml-5 '>
                <span className='text-green-500 mr-3'>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                DeliveryAddress : {user.location.display_name}
              </span>
              <span className='text-2xl mt-5 ml-5 '>
                Payment Method : Cash on delivery
              </span>
            </div>
            <div className='w-[86%] mt-5 text-2xl font-semibold border-b-2 border-gray-400 pb-5'>
              <span>Order Details : </span>
            </div>
            <div className='w-[80%] mt-5 text-2xl font-semibold justify-around flex  '>
              <span>Item </span>
              <span>Quantity </span>
              <span>Price </span>
            </div>
            {state.orderdata.cart.map((el) => (
              <OrderItem key={el._id} el={el} />
            ))}
            {/* <OrderItem />
          <OrderItem />
          <OrderItem /> */}

            <div className='w-[86%] mt-5 text-2xl font-semibold border-b-2 border-gray-400 pb-5'></div>
            <div className='w-[86%] mt-5 text-3xl font-bold flex justify-between'>
              <span>Total Bill : </span>
              <span>
                <FontAwesomeIcon icon={faIndianRupeeSign} />{' '}
                {state.orderdata.totalcost}
              </span>
            </div>
            {/* <span
            className='text-4xl mt-5 mb-5'
            style={{ fontFamily: 'Protest Riot' }}
          >
            Thank You for Ordering ,Hardik
          </span> */}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default OrderDashBoard;

import Bottom from './Bottom';
// import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBurger,
  faBagShopping,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { useContext, useState } from 'react';
import { FoodContext, FoodDispatch } from '../Context/FoodContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const x = "You're";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.cart);
  // const state = useContext(FoodContext);

  return (
    <>
      <div className='flex '>
        <div className='w-[50%] flex flex-col items-center pt-44'>
          <div className='text-6xl'>
            <span className='text-orange-600'>Hungry?</span> {x}
          </div>
          <div className='text-6xl mt-2'>in the right place </div>
          <div className='w-[100%]   flex  justify-evenly  mt-16 mb-5'>
            <div className='flex w-[25%] pl-2 pr-2 pb-3 items-center  flex-col shadow-2xl rounded bg-white duration-300 hover:scale-125'>
              <FontAwesomeIcon
                icon={faBurger}
                style={{
                  color: 'rgb(255 123 28)',
                  fontSize: '3rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                }}
              />
              <span className='text-2xl'>Choose the food</span>
            </div>
            <div className='flex w-[25%] pl-2 pr-2 pb-3  items-center  flex-col rounded shadow-2xl bg-white duration-300 hover:scale-125'>
              <FontAwesomeIcon
                icon={faBagShopping}
                style={{
                  color: 'rgb(255 123 28)',
                  fontSize: '3rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                }}
              />
              <span className='text-2xl'>Order And Pay</span>
            </div>
            <div className='flex w-[25%] pl-2 pr-2 pb-3  items-center  flex-col rounded shadow-2xl bg-white duration-300 hover:scale-125'>
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  color: 'rgb(255 123 28)',
                  fontSize: '3rem',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                }}
              />
              <span className='text-2xl'>Receive order</span>
            </div>
          </div>
          <button
            className='mt-10 p-4 bg-orange-500 text-white rounded-lg text-xl hover:shadow-2xl shadow-orange-500/50 '
            onClick={() => {
              navigate('/restaurants');
            }}
          >
            Order Now
          </button>
        </div>
        {/* <div className='w-[50%]  flex justify-end'>
          <img src={`../../Images/pic-3.avif`} className='' />
          <img src={`../../Images/pic-4.avif`} className={``} />
          <img src={`../../Images/pic-5.avif`} className='' />
        </div> */}
        <Bottom />
      </div>
    </>
  );
}

export default Home;

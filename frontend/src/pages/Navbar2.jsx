import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import React, { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { FoodContext, FoodDispatch } from '../Context/FoodContext';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../userSlice';
const listItemStyle = {
  marginTop: '6px',
  marginRight: '5px',
  height: '40px', // Adjusted to maintain a similar appearance to h-10
  paddingLeft: '15px', // Adjusted for better spacing
  paddingRight: '15px', // Adjusted for better spacing
  fontFamily: 'sans-serif',
  fontSize: '1.6rem', // Equivalent to text-xl in Tailwind
  color: 'black',
  backgroundColor: 'transparent', // Default background color
  borderRadius: '1.5rem', // Equivalent to rounded-3xl in Tailwind
};

const listItemHoverStyle = {
  backgroundColor: '#ef4444', // Equivalent to hover:bg-red-500 in Tailwind
  color: 'white', // Equivalent to group-hover:text-white in Tailwind
};
const items = [
  {
    key: '1',
    label: 'Your profile',
  },
  {
    key: '2',
    label: 'Log out',
  },
];
function Navbar() {
  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.key === '1') {
      navigate('/profile');
    }
    if (e.key === '2') {
      dispatch(userLogout());
    }
  };
  return (
    <div className=' flex justify-between pb-5'>
      <div
        className={` text-4xl mt-5 ml-3  font-bold`}
        style={{ fontFamily: 'Archivo Black' }}
      >
        FoodZone
      </div>
      <div className=' mt-5 '>
        <ul className='flex'>
          {state.cartitems.length ? (
            <span className='group'>
              <li className=' h-10 pl-5 pr-5 font-sans text-xl  hover:underline decoration-orange-600 decoration-2 cursor-pointer'>
                <Link to='/cart'>
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </li>
            </span>
          ) : (
            <span></span>
          )}
          <span className='group'>
            <li className=' h-10 pl-5 pr-5 font-sans text-xl  hover:underline decoration-orange-600 decoration-2 cursor-pointer'>
              <Link to='/'>Home</Link>
            </li>
          </span>
          <span className='group'>
            <li className='  h-10 pl-5 pr-5 font-sans text-xl  hover:hover:underline decoration-orange-600 decoration-2 cursor-pointer'>
              <Link to='/restaurants'>Restaurants </Link>
            </li>
          </span>

          {!localStorage.getItem('token') && (
            <span className='group'>
              <button className='font-sans text-xl pl-5 pr-5 text-orange-700 font-semibold'>
                <Link to='/login'>Login</Link>
              </button>
            </span>
          )}
          {localStorage.getItem('token') && (
            <span className='group'>
              <button className='font-sans text-xl pl-5 pr-5  font-semibold'>
                <Dropdown
                  className='font-sans text-xl pl-5 pr-5  font-semibold'
                  menu={{
                    items,
                    selectable: true,
                    onClick: handleClick,
                  }}
                  arrow={true}
                >
                  <Typography.Link>
                    <Space>
                      <FontAwesomeIcon icon={faUser} className='text-black' />
                      <span className='text-orange-700'>{user.name}</span>
                      <DownOutlined className='text-orange-700' />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </button>
            </span>
          )}
          {!localStorage.getItem('token') && (
            <span className='group'>
              <button className=' font-sans text-xl text-orange-700 font-semibold pl-5 pr-5 rounded-3xl border-2 border-orange-700 hover:bg-white'>
                <Link to='/signup'>Signup</Link>
              </button>
            </span>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

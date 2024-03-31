import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import PasswordModal from './PasswordModal';
import Pastorder from './Pastorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Allorders } from '../userSlice';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
// const pastorders = [
//   {
//     rated: false,
//     _id: '65fae791a4715248478849da',
//     user: '65be8bfad6a300fecd0b1921',
//     restaurant: 'Punjabi',
//     cart: [
//       {
//         name: 'Plain Naan',
//         price: 35,
//         quantity: 1,
//         _id: '65fae56318012c91ab23b6ea',
//       },
//     ],
//     totalcost: 115,
//     __v: 0,
//   },
//   {
//     rated: false,
//     _id: '65fb3cf7a6198923f97ff4fb',
//     user: '65be8bfad6a300fecd0b1921',
//     restaurant: 'Punjabi',
//     cart: [
//       {
//         name: 'Plain Naan',
//         price: 35,
//         quantity: 1,
//         _id: '65fb3cf0a6198923f97ff4dc',
//       },
//       {
//         name: 'Dal fry',
//         price: 120,
//         quantity: 2,
//         _id: '65fb3cf1a6198923f97ff4e5',
//       },
//     ],
//     totalcost: 275,
//     __v: 0,
//   },
//   {
//     _id: '65fbdc7e930a7169fc5d4f57',
//     user: '65be8bfad6a300fecd0b1921',
//     restaurant: 'Punjabi',
//     cart: [
//       {
//         name: 'Plain Naan',
//         price: 35,
//         quantity: 1,
//         _id: '65fbd76f930a7169fc5d4f24',
//       },
//       {
//         name: 'Laccha Paratha',
//         price: 40,
//         quantity: 2,
//         _id: '65fbd772930a7169fc5d4f2d',
//       },
//     ],
//     totalcost: 115,
//     rated: false,
//     __v: 0,
//   },
// ];

function Profile() {
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(
    function () {
       dispatch(Allorders());

      console.log(user.pastorders);
    },
    [user.pastordersarrived]
  );
  useEffect(
    function () {
      if (!user.Loggedin) navigate('/login');
    },
    [user.Loggedin]
  );
  return state.Loading ? (
    <Spinner />
  ) : (
    <div>
      <div
        className='mt-5 ml-10 mb-10 text-5xl font-semibold '
        style={{ fontFamily: 'Protest' }}
      >
        Past Orders :
      </div>
      {user.pastorders.map((el) => (
        <Pastorder key={el._id} el={el} />
      ))}
      {/* <Pastorder /> */}
    </div>
  );
}

export default Profile;

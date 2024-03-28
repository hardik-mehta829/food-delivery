import { useDispatch, useSelector } from 'react-redux';
import {
  setemail,
  setpassword,
  userSignup,
  setname,
  setpasswordconfirm,
} from '../userSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state.cart);
  const [username, setusername] = useState('');
  const [useremail, setuseremail] = useState('');
  const [userpassword, setuserpassword] = useState('');
  const [userpasswordconfirm, setuserpasswordconfirm] = useState('');
  useEffect(
    function () {
      if (user.Loggedin) {
        if (state.activeRestaurant)
          navigate(`/restaurants/:${state.activeRestaurant}`);
        else navigate(`/restaurants`);
      }
    },
    [user.Loggedin]
  );
  return (
    <div className='w-96   mx-auto my-[90px] flex flex-col items-center rounded-md border-4 border-orange-700 backdrop-blur-md bg-white/40'>
      <p className='text-2xl my-[20px]  font-black'>Signup Form</p>
      <form className=' flex flex-col    mt-[15px]'>
        <input
          type='text'
          placeholder='Name'
          id='name'
          name='name'
          value={username}
          // className='w-[326px]  h-14 px-2 rounded-md  border-2 hover:border-purple-300'
          className='w-[326px]  h-14 px-2 rounded-md  border-2 '
          onChange={(e) => {
            // dispatch(setname(e.target.value));
            setusername(e.target.value);
          }}
        ></input>
        <input
          type='text'
          placeholder='Email'
          id='email'
          name='email'
          className='w-[326px]  h-14 px-2 rounded-md  border-2 mt-10'
          value={useremail}
          // className='w-[326px]  h-14 px-2 rounded-md  border-2 hover:border-purple-300 mt-[40px]'
          onChange={(e) => {
            // dispatch(setemail(e.target.value));
            setuseremail(e.target.value);
          }}
        ></input>
        <input
          type='password'
          placeholder='Password'
          id='password'
          name='password'
          className='w-[326px] h-14 px-2 rounded-md mt-[40px] border-2  '
          value={userpassword}
          // className='w-[326px] h-14 px-2 rounded-md mt-[40px] border-2  hover:border-purple-300'
          onChange={(e) => {
            // dispatch(setpassword(e.target.value));
            setuserpassword(e.target.value);
          }}
        ></input>
        <input
          type='password'
          placeholder='PasswordConfirm'
          id='passwordconfirm'
          name='passwordconfirm'
          className='w-[326px] h-14 px-2 rounded-md mt-[40px] border-2  '
          value={userpasswordconfirm}
          // className='w-[326px] h-14 px-2 rounded-md mt-[40px] border-2  hover:border-purple-300'
          onChange={(e) => {
            // dispatch(setpasswordconfirm(e.target.value));
            setuserpasswordconfirm(e.target.value);
          }}
        ></input>
      </form>
      <button
        type='submit'
        className='w-[326px] h-14 rounded-full text-white bg-orange-600 mt-[45px] text-xl font-mono mb-5'
        onClick={() => {
          dispatch(
            userSignup(username, useremail, userpassword, userpasswordconfirm)
          );
          setuseremail('');
          setusername('');
          setuserpassword('');
          setuserpasswordconfirm('');
        }}
      >
        {/* <button className='w-[326px] h-14 rounded-full text-white bg-purple-600 mt-[45px] text-xl hover:bg-purple-700 font-mono'> */}
        Signup
      </button>
    </div>
  );
};

export default Signup;

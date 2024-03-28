import { useDispatch, useSelector } from 'react-redux';
import { setemail, setpassword, userLogin } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state.cart);
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
    <div className='w-96 h-96  mx-auto my-[150px] flex flex-col items-center rounded-xl border-4 border-orange-700  backdrop-blur-md bg-white/40  '>
      <p className='text-2xl my-[20px]  font-black '>Login Form</p>
      <form className=' flex flex-col    mt-[15px]'>
        <input
          type='text'
          placeholder='Email'
          id='email'
          name='email'
          value={user.email}
          // className='w-[326px]  h-14 px-2 rounded-md  border-2 hover:border-purple-300'
          className='w-[326px]  h-14 px-2 rounded-md  border-2 '
          onChange={(e) => {
            dispatch(setemail(e.target.value));
          }}
        ></input>
        <input
          type='password'
          placeholder='Password'
          id='password'
          name='password'
          value={user.password}
          // className='w-[326px] h-14 px-2 rounded-md mt-[40px] border-2  hover:border-purple-300'
          className='w-[326px] h-14 px-2 rounded-md mt-[40px] border-2  '
          onChange={(e) => {
            dispatch(setpassword(e.target.value));
          }}
        ></input>
      </form>
      {/* <button className='w-[326px] h-14 rounded-full text-white bg-purple-600 mt-[45px] text-xl hover:bg-purple-700 font-mono'> */}
      <button
        type='button'
        className='w-[326px] h-14 rounded-full text-white bg-orange-600 mt-[45px] text-xl '
        onClick={() => {
          dispatch(userLogin(user.email, user.password));
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;

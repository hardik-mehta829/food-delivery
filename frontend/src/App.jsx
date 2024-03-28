import { useContext, useEffect, useState } from 'react';
import Error from './pages/Error';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Menuitem from './pages/Menuitem';
import Navbar from './pages/Navbar2';
import OrderDashBoard from './pages/OrderDashBoard';
import Profile from './pages/Profile';
import Restaurant from './pages/Restaurant';
import Restaurants from './pages/Restaurants';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from './pages/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import promise from './promise';

import {
  activerestro,
  selectrestro,
  addItem,
  emptycart,
  selectMenu,
  initialCart,
  Fetchorder,
} from './cartSlice';
import LoadingButton from './pages/Loading-Button';
import { setname, setid } from './userSlice';
function App() {
  document.body.style.backgroundColor = 'rgb(255,237,224)';
  const state = useSelector((state) => state.cart);
  const { name, email, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(function () {
    if (localStorage.getItem('token')) {
      console.log('App');
      dispatch(setname(localStorage.getItem('name')));
      dispatch(setid(localStorage.getItem('id')));

      if (id) dispatch(initialCart(id));
    }
  }, []);
  useEffect(
    function () {
      if (localStorage.getItem('token')) {
        if (id) dispatch(initialCart(id));
      }
    },
    [id, dispatch]
  );
  return (
    <>
      <Router>
        <Navbar />
        <Error />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/restaurants/:restname' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<OrderDashBoard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
      {/* <Profile /> */}
    </>
  );
}

export default App;

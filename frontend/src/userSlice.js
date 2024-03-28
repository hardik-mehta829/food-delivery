import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  location: {},
  alert: '',
  isLoading: false,
  name: '',
  email: '',
  password: '',
  passwordconfirm: '',
  Loggedin: false,
  id: '',
  pastorders: [],
  pastordersarrived: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setpastorders(state, action) {
      state.pastorders = [...action.payload];
      state.pastordersarrived = true;
    },
    setname(state, action) {
      state.name = action.payload;
    },
    setid(state, action) {
      state.id = action.payload;
      state.Loggedin = true;
    },
    setemail(state, action) {
      state.email = action.payload;
    },
    setpassword(state, action) {
      state.password = action.payload;
    },
    setpasswordconfirm(state, action) {
      state.passwordconfirm = action.payload;
    },
    loading(state, action) {
      state.isLoading = true;
    },
    getlocation(state, action) {
      state.location = { ...action.payload };

      state.isLoading = false;
    },
    Alert(state, action) {
      state.alert = action.payload.message;
    },
    logout(state, action) {
      state.name = '';
      state.pastorders = [];
      state.pastordersarrived = false;
      state.Loggedin = false;
      state.id = '';
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('orderid');
      localStorage.removeItem('activeRestaurant');
    },
  },
});
export const {
  Alert,
  loading,
  setemail,
  setpassword,
  setname,
  logout,
  setid,
  setpasswordconfirm,
} = userSlice.actions;
export function userSignup(name, email, password, passwordconfirm) {
  // console.log(email, password);
  if (email === '' || password === '' || name === '' || passwordconfirm === '')
    return {
      type: 'user/Alert',
      payload: { message: 'You cannot leave anyfield empty' },
    };
  return async function (dispatch, getState) {
    try {
      console.log(name, email, password, passwordconfirm);
      // const res = await fetch('http://127.0.0.1:3000/api/v1/users/createuser', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, email, password, passwordconfirm }),
      // });
      const res = await fetch(
        'https://food-backend-9xt6.onrender.com/api/v1/users/createuser',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, passwordconfirm }),
        }
      );
      if (!res.ok) {
        dispatch({
          type: 'user/Alert',
          payload: { message: 'Please enter valid credentials' },
        });
      } else {
        const data = await res.json();
        console.log(data);
        if (data.error)
          dispatch({ type: 'user/Alert', payload: { message: data.error } });
        else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', name);
          localStorage.setItem('id', data.id);
          dispatch({ type: 'user/setname', payload: name });
          dispatch({ type: 'user/setid', payload: data.id });
        }
      }
      dispatch({ type: 'user/setemail', payload: '' });
      dispatch({ type: 'user/setpassword', payload: '' });
      dispatch({ type: 'user/setpasswordconfirm', payload: '' });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: 'user/Alert', payload: { message: error.message } });
    }
  };
}
export function Getlocation() {
  return async function (dispatch, getState) {
    dispatch({ type: 'user/loading' });
    const p = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const position = await p;
    console.log(position.coords.latitude);
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=pk.ed5da348fddb98b6f40f836a9598514f&&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );
    const location = await res.json();

    dispatch({ type: 'user/getlocation', payload: location });
  };
}
export function userLogin(email, password) {
  // console.log(email, password);
  if (email === '' || password === '')
    return {
      type: 'user/Alert',
      payload: { message: 'You cannot leave anyfield empty' },
    };
  return async function (dispatch, getState) {
    try {
      // const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const res = await fetch(
        'https://food-backend-9xt6.onrender.com/api/v1/users/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        dispatch({
          type: 'user/Alert',
          payload: { message: 'Please enter valid credentials' },
        });
      } else {
        const data = await res.json();
        console.log(data);
        localStorage.setItem('token', data.token);
        dispatch({ type: 'user/setname', payload: data.name });
        localStorage.setItem('name', data.name);
        dispatch({ type: 'user/setid', payload: data.id });
        localStorage.setItem('id', data.id);
        dispatch({ type: 'user/setid', payload: data.id });
      }
      dispatch({ type: 'user/setemail', payload: '' });
      dispatch({ type: 'user/setpassword', payload: '' });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: 'user/Alert', payload: { message: error.message } });
    }
  };
}
export function userLogout() {
  return async function (dispatch, getState) {
    const { cart } = getState();
    dispatch({ type: 'cart/emptycart' });
    dispatch({ type: 'user/logout' });
  };
}
export function Allorders() {
  return async function (dispatch, getState) {
    dispatch({ type: 'cart/setLoading', payload: true });
    // const res = await fetch('http://127.0.0.1:3000/api/v1/users/allorders', {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json',
    //     token: localStorage.getItem('token'),
    //   },
    // });
    const res = await fetch(
      'https://food-backend-9xt6.onrender.com/api/v1/users/allorders',
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: 'user/setpastorders', payload: data.orders });
    dispatch({ type: 'cart/setLoading', payload: false });
  };
}
export function RateMeal(id, rating) {
  return async function (dispatch, getState) {
    console.log(id, rating);
    // const res = await fetch(
    //   `http://127.0.0.1:3000/api/v1/orders/review/${id}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //       token: localStorage.getItem('token'),
    //     },
    //     body: JSON.stringify({ rating: rating }),
    //   }
    // );
    const res = await fetch(
      `https://food-backend-9xt6.onrender.com/api/v1/orders/review/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ rating: rating }),
      }
    );
    const data = await res.json();
    console.log(data);
  };
}
export default userSlice.reducer;

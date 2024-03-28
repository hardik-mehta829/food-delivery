import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  restaurants: [],
  cartitems: [],
  orderdata: {},
  selectedRestaurant: '',
  activeRestaurant: '',
  selectedMenu: [],
  totalcost: 0,
  Loading: false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    allrestaurants(state, action) {
      state.restaurants = [...action.payload];
      state.Loading = false;
    },
    activerestro(state, action) {
      state.activeRestaurant = action.payload;
      localStorage.setItem('activeRestaurant', action.payload);
    },
    setLoading(state, action) {
      state.Loading = action.payload;
    },
    selectrestro(state, action) {
      state.selectedRestaurant = action.payload;
      // localStorage.setItem('selectedRestaurant', action.payload);
    },
    FullMenu(state, action) {
      state.selectedMenu = [...action.payload];
      state.Loading = false;
      // console.log(state.selectedMenu);
    },
    initialcart(state, action) {
      state.cartitems = [...action.payload];
      // state.totalcost = state.cartitems.reduce((total, item) => {
      //   return total + item.price * item.qty;
      // }, 0);
    },
    initialcost(state, action) {
      state.totalcost = action.payload;
    },
    additem(state, action) {
      state.cartitems = [...action.payload];
      state.totalcost = state.cartitems.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
    },
    // addItem(state, action) {
    //   if (state.cartitems.find((el) => el.name === action.payload.name)) {
    //     const item = state.cartitems.find(
    //       (el) => el.name === action.payload.name
    //     );
    //     item.qty++;
    //     const remarray = state.cartitems.filter(
    //       (el) => el.name !== action.payload.name
    //     );
    //     state.cartitems = [...remarray, item];

    //     localStorage.setItem('cartitems', JSON.stringify(state.cartitems));
    //     const x = JSON.parse(localStorage.getItem('cartitems'));
    //   } else {
    //     state.cartitems.push({ ...action.payload, qty: 1 });
    //     localStorage.setItem('cartitems', JSON.stringify(state.cartitems));
    //   }
    //   state.totalcost = state.cartitems.reduce((total, item) => {
    //     return total + item.price * item.qty;
    //   }, 0);
    // },
    removeitem(state, action) {
      state.cartitems = [...action.payload];
      state.totalcost = state.cartitems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      // const item = state.cartitems.find(
      //   (el) => el.name === action.payload.name
      // );
      // item.qty--;
      // const remarray = state.cartitems.filter(
      //   (el) => el.name !== action.payload.name
      // );
      // if (item.qty === 0) {
      //   state.cartitems = [...remarray];
      //   if (state.cartitems.length === 0) {
      //     localStorage.removeItem('cartitems');
      //     state.selectedRestaurant = '';

      //     localStorage.removeItem('selectedRestaurant');
      //   } else
      //     localStorage.setItem('cartitems', JSON.stringify(state.cartitems));
      // } else {
      //   state.cartitems = [...remarray, item];
      //   localStorage.setItem('cartitems', JSON.stringify(state.cartitems));
      // }
      // state.totalcost = state.cartitems.reduce((total, item) => {
      //   return total + item.price * item.qty;
      // }, 0);
    },
    emptycart(state, action) {
      state.cartitems = [];
      state.selectedRestaurant = '';
      state.totalcost = 0;
      localStorage.removeItem('selectedRestaurant');
      localStorage.removeItem('cartitems');
    },
    placeorder(state, action) {
      state.orderdata = { ...action.payload };
      state.Loading = false;
    },
  },
});
// console.log(cartSlice);
export const { activerestro, selectrestro, emptycart } = cartSlice.actions;
export function Allrestaurants() {
  return async function (dispatch, getState) {
    dispatch({ type: 'cart/setLoading', payload: true });
    const res = await fetch(`http://127.0.0.1:3000/api/v1/Restaurants/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    });
    const data = await res.json();
    dispatch({ type: 'cart/allrestaurants', payload: data });
  };
}
export function addItem(itemid, restname) {
  return async function (dispatch, getState) {
    const cleanedRestname = restname.replace(':', '');
    const { cart } = getState();
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/${cleanedRestname}/additem/${itemid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.error) {
      // const { user } = getState();

      dispatch({ type: 'user/Alert', payload: { message: data.error } });
    } else {
      if (!cart.selectedRestaurant)
        dispatch({ type: 'cart/selectrestro', payload: cleanedRestname });
      dispatch({ type: 'cart/additem', payload: data.cart });
      dispatch({ type: 'cart/initialcost', payload: data.totalcost });
      localStorage.removeItem('orderid');
      dispatch({ type: 'cart/placeorder', payload: [] });
    }
  };
  // return { type: 'cart/addItem', payload: { name, price } };
}
export function removeItem(itemid, restname) {
  return async function (dispatch, getState) {
    const cleanedRestname = restname.replace(':', '');
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/${cleanedRestname}/deleteitemfromCart/${itemid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: 'cart/removeitem', payload: data.cart });
    if (data.cart.length !== 0)
      dispatch({ type: 'cart/initialcost', payload: data.totalcost });
    if (data.cart.length === 0)
      dispatch({ type: 'cart/selectrestro', payload: '' });
  };
  // return { type: 'cart/addItem', payload: { name, price } };
}
export function Opencart() {
  return async function (dispatch, getState) {
    // console.log('hello');
    const { cart } = getState();
    // console.log(cart);
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/${cart.selectedRestaurant}/viewcart`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };
}
export function initialCart(id) {
  // console.log(id);
  return async function (dispatch, getState) {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/users/finduser/${id}`
    );
    const userdata = await res.json();
    console.log(userdata);
    dispatch({
      type: 'cart/selectrestro',
      payload: userdata.user.selectedRestaurant,
    });
    if (userdata.user.selectedRestaurant === 'McDonald')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartMc });
    if (userdata.user.selectedRestaurant === 'Patel')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartPatel });
    if (userdata.user.selectedRestaurant === 'DreamArena')
      dispatch({
        type: 'cart/initialcart',
        payload: userdata.user.cartDreamArena,
      });
    if (userdata.user.selectedRestaurant === 'ChawlaChicken')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartChawla });
    if (userdata.user.selectedRestaurant === 'Tansen')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartTansen });
    if (userdata.user.selectedRestaurant === 'Raj')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartRaj });
    if (userdata.user.selectedRestaurant === 'PunjabiZyaka')
      dispatch({
        type: 'cart/initialcart',
        payload: userdata.user.cartPunjabiZyaka,
      });
    if (userdata.user.selectedRestaurant === 'SherePunjabi')
      dispatch({
        type: 'cart/initialcart',
        payload: userdata.user.cartSherePunjabi,
      });
    if (userdata.user.selectedRestaurant === 'Volga')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartVolga });
    if (userdata.user.selectedRestaurant === 'BurgerKing')
      dispatch({ type: 'cart/initialcart', payload: userdata.user.cartKing });
    dispatch({ type: 'cart/initialcost', payload: userdata.user.totalcost });
  };
}
export function selectMenu(restname) {
  return async function (dispatch, getState) {
    dispatch({ type: 'cart/setLoading' });
    const res = await fetch(`http://127.0.0.1:3000/api/v1/${restname}`);
    const menu = await res.json();
    // console.log(menu);
    dispatch({ type: 'cart/FullMenu', payload: menu.data });
  };
}
export function Placeorder() {
  return async function (dispatch, getState) {
    dispatch({ type: 'cart/setLoading', payload: true });
    const { cart } = getState();
    const { user } = getState();
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/${cart.selectedRestaurant}/placeorder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          location: user.location,
          date: new Date().toDateString(),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.error) {
      dispatch({ type: 'user/Alert', payload: { message: data.error } });
    } else {
      localStorage.setItem('orderid', data.order._id);
      dispatch({ type: 'cart/placeorder', payload: data.order });
      dispatch({ type: 'cart/initialcart', payload: [] });
      dispatch({ type: 'cart/selectrestro', payload: '' });
      dispatch({ type: 'cart/initialcost', payload: 0 });
    }
  };
}
export function Fetchorder(id) {
  return async function (dispatch, getState) {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/orders/singleorder/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    dispatch({ type: 'cart/placeorder', payload: data.data });
    dispatch({ type: 'user/getlocation', payload: data.data.location });
  };
}
export function clearCart() {
  return async function (dispatch, getState) {
    const { cart } = getState();
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/${cart.selectedRestaurant}/clearcart`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    const data = await res.json();
    if (data.error) {
      dispatch({ type: 'user/Alert', payload: { message: data.error } });
    } else dispatch({ type: 'cart/emptycart' });
  };
}
export function sortedMenu(num) {
  return async function (dispatch, getState) {
    dispatch({ type: 'cart/setLoading', payload: true });
    const { cart } = getState();
    if (num === 1) {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/${cart.activeRestaurant}?sort=price`
      );
      const menu = await res.json();
      dispatch({ type: 'cart/FullMenu', payload: menu.data });
    } else {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/${cart.activeRestaurant}?sort=-price`
      );
      const menu = await res.json();
      dispatch({ type: 'cart/FullMenu', payload: menu.data });
    }
  };
}
export default cartSlice.reducer;

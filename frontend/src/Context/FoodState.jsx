import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { FoodContext, FoodDispatch } from './FoodContext';

const initialState = {
  selectedRestaurant: '',
  Menu: [],
};
function reducer(state, action) {
  switch (action.type) {
    case 'activeRestaurant': {
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    }
    case 'selectedMenu': {
      return {
        ...state,
        Menu: [...action.payload],
      };
    }
  }
}
function FoodState({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    console.log('foodstate');
    if (localStorage.getItem('activeRestaurant')) {
      dispatch({
        type: 'activeRestaurant',
        payload: localStorage.getItem('activeRestaurant'),
      });
    }
  }, []);
  return (
    <FoodContext.Provider value={state}>
      <FoodDispatch.Provider value={dispatch}>{children}</FoodDispatch.Provider>
    </FoodContext.Provider>
  );
}
// FoodState.propTypes = {
//   children: PropTypes.node.isRequired,
// };
export default FoodState;

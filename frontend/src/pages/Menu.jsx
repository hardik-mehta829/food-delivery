import ViewCart from './ViewCart';
import Menuitem from './Menuitem';
import { FoodContext, FoodDispatch } from '../Context/FoodContext';
import ChawlaMenu from '../../../backend/MenuData/ChawlaChicken.json';
import DreamMenu from '../../../backend/MenuData/DreamArena.json';
import McMenu from '../../../backend/MenuData/McDonald.json';
import PatelMenu from '../../../backend/MenuData/Patel.json';
import TansenMenu from '../../../backend/MenuData/Tansen.json';
import RajMenu from '../../../backend/MenuData/Raj.json';
import PunjabiMenu from '../../../backend/MenuData/PunjabiZyaka.json';
import ShereMenu from '../../../backend/MenuData/SherePunjabi.json';
import VolgaMenu from '../../../backend/MenuData/Volga.json';
import BurgerKingMenu from '../../../backend/MenuData/burgerking.json';
import { useContext, useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectrestro,
  addItem,
  removeItem,
  emptycart,
  selectMenu,
  activerestro,
} from '../cartSlice';
import Filter from './Filter';
import { useParams } from 'react-router-dom';
function Menu() {
  const { activeRestaurant, selectedMenu, cartitems } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const { restname } = useParams();
  const [Loading, setLoading] = useState(false);

  useEffect(
    function () {
      if (localStorage.getItem('activeRestaurant')) {
        dispatch(activerestro(localStorage.getItem('activeRestaurant')));
      }
      const cleanedRestname = restname.replace(':', ''); // Remove colon
      dispatch(selectMenu(cleanedRestname));

      // if (activeRestaurant === 'Mc') dispatch(selectMenu(McMenu));
      // if (activeRestaurant === 'Patel') dispatch(selectMenu(PatelMenu));
      // if (activeRestaurant === 'Dream') dispatch(selectMenu(DreamMenu));
      // if (activeRestaurant === 'Chawla') dispatch(selectMenu(ChawlaMenu));
      // if (activeRestaurant === 'Tansen') dispatch(selectMenu(TansenMenu));
      // if (activeRestaurant === 'Raj') dispatch(selectMenu(RajMenu));
      // if (activeRestaurant === 'Punjabi') dispatch(selectMenu(PunjabiMenu));
      // if (activeRestaurant === 'Shere') dispatch(selectMenu(ShereMenu));
      // if (activeRestaurant === 'Volga') dispatch(selectMenu(VolgaMenu));
      // if (activeRestaurant === 'BurgerKing')
      //   dispatch(selectMenu(BurgerKingMenu));
    },
    [activeRestaurant, dispatch]
  );

  // useEffect(function () {
  //   console.log(x);
  // }, []);

  return (
    <>
      {Loading && <Spinner />}
      <div className='flex items-center flex-col '>
        {!Loading && (
          <div className='flex  w-[90%] justify-between'>
            <span>
              <Filter />
            </span>
            <span
              className='text-6xl mb-10'
              style={{ fontFamily: 'Noto Sana' }}
            >
              {`${activeRestaurant}'s Menu`}
            </span>
            <span>
              {/* <input
                type='checkbox'
                id='veg'
                name='veg'
                value='veg'
                onChange={(e) => console.log(e.target.checked)}
                className='h-6 w-6'
              /> */}
              {/* <label htmlFor='veg' className='text-2xl ml-2'>
                Veg
              </label> */}
            </span>
          </div>
        )}
        {!Loading &&
          selectedMenu.map((el) => (
            <Menuitem
              key={el._id}
              name={el.name}
              price={el.price}
              type={el.class}
              image={el.image}
              itemid={el._id}
            />
          ))}
      </div>
      {cartitems.length && (
        <div className='flex  justify-center'>
          <ViewCart />
        </div>
      )}
    </>
  );
}

export default Menu;

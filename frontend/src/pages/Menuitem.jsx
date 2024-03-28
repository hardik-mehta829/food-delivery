import { faIndianRupeeSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import useConfig from 'antd/es/config-provider/hooks/useConfig';
import { useContext, useEffect, useState } from 'react';
import { FoodContext } from '../Context/FoodContext';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '../userSlice';
import {
  activerestro,
  selectrestro,
  addItem,
  removeItem,
  emptycart,
  selectMenu,
} from '../cartSlice';
import { useParams } from 'react-router-dom';
function Menuitem({ name, image, price, type, itemid }) {
  const [qty, setqty] = useState(0);
  const { restname } = useParams();
  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(
    function () {
      if (state.cartitems.length) {
        const item = state.cartitems.find((el) => el.itemid === itemid);

        if (item) setqty(item.quantity);
        else setqty(0);
      } else setqty(0);
    },
    [state.cartitems]
  );
  return (
    <div className=' h-[7rem] w-[50%] flex rounded-md relative bg-white  mb-10 border-orange-600 border-4'>
      <img
        src={`../../Images/${state.activeRestaurant}/${image}`}
        alt='No image'
        style={{ height: '100%' }}
        className='object-contain'
      />
      <div className='ml-3 flex flex-col  justify-between '>
        <span className='text-xl'>{name}</span>

        <span className='text-lg'>
          <FontAwesomeIcon icon={faIndianRupeeSign} /> {price}
        </span>
      </div>
      <div className='absolute right-2 flex flex-col  h-[100%] items-center justify-around'>
        <span className='text-xl ml-4'>
          3.5 <FontAwesomeIcon icon={faStar} className='text-amber-400' />
        </span>

        {!qty ? (
          <Button
            type='text'
            className='text-xl  bg-orange-500 text-white h-[40%]'
            onClick={() => {
              if (!user.Loggedin) {
                dispatch(
                  Alert({
                    message: 'Login or Signup first to add items to your cart',
                  })
                );
              } else {
                // if (
                //   !state.selectedRestaurant ||
                //   state.selectedRestaurant === state.activeRestaurant
                // ) {
                //   setqty((q) => q + 1);
                //   dispatch(selectrestro(state.activeRestaurant));
                //   dispatch(addItem({ name, price }));
                // } else console.log('You can select only one restaurant');
                dispatch(addItem(itemid, restname));
              }
            }}
          >
            Add
          </Button>
        ) : (
          <div className='text-xl   h-[40%]'>
            <Button
              className='mr-5 bg-orange-500 text-white'
              onClick={() => {
                // setqty((q) => q + 1);
                dispatch(addItem(itemid, restname));
              }}
            >
              &#43;
            </Button>
            {qty}
            <Button
              className='ml-5 bg-orange-500 text-white'
              onClick={() => {
                // setqty((q) => q - 1);

                dispatch(removeItem(itemid, restname));
              }}
            >
              &#8722;
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
Menuitem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
export default Menuitem;

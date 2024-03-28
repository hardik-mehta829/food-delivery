import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  activerestro,
  selectrestro,
  addItem,
  removeItem,
  emptycart,
  selectMenu,
  initialCart,
} from '../cartSlice';
function CartItem({ el }) {
  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const name = el.name;
  const price = el.price;
  return (
    <div className='h-[5rem] w-[30%] flex justify-between  items-center border-b-2 border-black pl-2 pr-2 bg-white'>
      <span className='text-2xl  w-[200px]'>{el.name}</span>
      <div type='text' className='text-xl    h-[40%]'>
        <Button
          className='mr-2 bg-orange-500'
          onClick={() => {
            dispatch(addItem(el.itemid, state.selectedRestaurant));
          }}
        >
          &#43;
        </Button>
        {el.quantity}
        <Button
          className='ml-2 bg-orange-500'
          onClick={() => {
            dispatch(removeItem(el.itemid, state.selectedRestaurant));
          }}
        >
          &#8722;
        </Button>
      </div>
      <span className='text-2xl'>
        <FontAwesomeIcon icon={faIndianRupeeSign} />
        {el.quantity * el.price}
      </span>
    </div>
  );
}

export default CartItem;

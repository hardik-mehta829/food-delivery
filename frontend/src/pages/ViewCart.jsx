import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Opencart } from '../cartSlice';
function ViewCart() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='bg-green-600 w-[40%] h-[4rem] fixed bottom-0  m-auto justify-between flex items-center text-white text-lg'>
      <span className='ml-5'>
        {state.cartitems.length} item added to cart
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
      <Button
        type='text'
        className='mr-5  bg-white'
        size='large'
        onClick={() => {
          // dispatch(Opencart());
          navigate('/cart');
        }}
      >
        View Cart
      </Button>
    </div>
  );
}

export default ViewCart;

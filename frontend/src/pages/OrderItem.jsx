import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function OrderItem({ el }) {
  return (
    <div className='w-[80%]  flex justify-around text-xl mt-5 '>
      <span>{el.name}</span>
      <span>{el.quantity}</span>
      <span>
        <FontAwesomeIcon icon={faIndianRupeeSign} /> {el.price * el.quantity}
      </span>
    </div>
  );
}

export default OrderItem;

import { faIndianRupeeSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import StarRating from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { RateMeal } from '../userSlice';

const starsArray = Array.from({ length: 5 }, (_, index) => (
  <FontAwesomeIcon
    key={index}
    icon={faStar}
    className='ml-3 text-3xl hover:text-amber-400 cursor-pointer'
  />
));
function Pastorder({ el }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen2, setIsModalOpen2] = useState(false);
  const [userRating, setuserRating] = useState(0);
  const [Rated, isRated] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => {
    setIsModalOpen(false);
    console.log(userRating);
    if (userRating) {
      isRated(true);
      dispatch(RateMeal(id, userRating));
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='bg-white w-[80%] flex flex-col m-auto pl-2 pr-2 mt-10'>
      <div className='w-[100%] flex justify-between items-center'>
        <div className='flex flex-col'>
          <span className='text-3xl font-semibold mb-2'>{el.restaurant}</span>
          <span className='text-xl'>Order {el._id}</span>
        </div>
        <div className='text-xl'>
          Ordered on : {el.date ? el.date : '18 Mar,2024'}
        </div>
      </div>
      <div className='w-[100%] flex justify-between mt-10'>
        <div className='text-xl'>
          {el.cart.map((item, ind) => {
            if (ind === el.cart.length - 1)
              return `${item.name} x ${item.quantity}`;
            else return `${item.name} x ${item.quantity} + `;
          })}
        </div>
        <div className='text-xl flex'>
          Total paid :{' '}
          <span className='ml-2'>
            <FontAwesomeIcon icon={faIndianRupeeSign} /> {el.totalcost}
          </span>
        </div>
      </div>
      <Button
        type='text'
        className='bg-orange-500 h-[40%] p-1 text-lg text-white font-medium w-[10%] mt-5'
        onClick={showModal}
        disabled={Rated || el.rated}
      >
        Rate order
      </Button>
      <Modal
        title={
          <span className='text-2xl'>Rate your meal from {el.restaurant}</span>
        }
        open={isModalOpen}
        onOk={() => handleOk(el._id)}
        onCancel={handleCancel}
        className='text-xl'
        okButtonProps={{
          disabled: false,
          style: {
            backgroundColor: 'blue',
            marginTop: '3rem',
          },
        }}
        cancelButtonProps={{ style: { marginTop: '3rem' } }}
        okText='Done'
      >
        <div
          className='flex justify-center  w-[100%] mt-10'
          key={el.restaurant}
        >
          <span className=''>
            {<StarRating setuserRating={setuserRating} />}
          </span>
        </div>
      </Modal>
    </div>
  );
}

export default Pastorder;

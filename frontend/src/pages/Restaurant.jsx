import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { activerestro, selectrestro, addItem, emptycart } from '../cartSlice';
import { FoodContext, FoodDispatch } from '../Context/FoodContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const { Meta } = Card;

function Restaurant({ title, description, image, ratingsAverage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className='duration-300 hover:scale-110'
      onClick={() => {
        const arr = title.split(' ');
        dispatch(activerestro(arr[0]));
        navigate(`/restaurants/:${arr[0]}`);
      }}
    >
      <Card
        hoverable
        style={{
          width: 350,
        }}
        cover={<img alt='example' src={`../../Images/${image}`} />}
      >
        <Meta
          title={
            <div className='flex'>
              <span className='text-3xl text-black font-semibold'>{title}</span>
              <span className='text-xl ml-4'>
                {ratingsAverage.toFixed(2)}
                <FontAwesomeIcon icon={faStar} className='text-amber-400' />
              </span>
            </div>
          }
          description={
            <span className='text-xl text-black'>{description}</span>
          }
        />
      </Card>
    </div>
  );
}
Restaurant.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default Restaurant;

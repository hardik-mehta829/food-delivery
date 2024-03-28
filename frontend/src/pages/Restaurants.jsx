import { useEffect, useState } from 'react';
import Restaurant from './Restaurant';
import { Allrestaurants } from '../cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
const restaurants = [
  {
    name: 'BurgerKing',
    description: 'Burger , fries ,Soft drink',
    image: 'burgerking.jpeg',
  },
  {
    name: 'Patel',
    description: 'North indian , south indian , chinese',
    image: 'Patel.jpg',
  },
  {
    name: 'Tansen',
    description: 'North indian , south indian , chinese',
    image: 'test.jpg',
  },
  {
    name: 'PunjabiZyaka',
    description: 'North indian , south indian , chinese',
    image: 'Zyaka.jpg',
  },
  {
    name: 'McDonald',
    description: 'Burger,fries,Paneer wrap',
    image: 'McDonald-2.jpeg',
  },
  {
    name: 'Raj',
    description: 'North indian , south indian , chinese',
    image: 'test-2.jpg',
  },
  {
    name: 'ChawlaChicken',
    description: 'Non-veg food and Soup',
    image: 'Chawla-Chicken.jpg',
  },
  {
    name: 'Volga',
    description: 'North indian , south indian , chinese',
    image: 'test-4.jpg',
  },
  {
    name: 'DreamArena',
    description: 'Beverages',
    image: 'test-3.jpg',
  },
  {
    name: 'SherePunjabi',
    description: 'North indian , south indian , chinese',
    image: 'Shere-Punjabi.jpg',
  },
];
function Restaurants() {
  const [arrived, setarrived] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  useEffect(
    function () {
      dispatch(Allrestaurants());
      if (state.restaurants) setarrived(true);
      console.log(state.restaurants);
    },
    [dispatch]
  );
  return (
    <>
      {state.Loading ? (
        <Spinner />
      ) : (
        <div className=' m-auto grid grid-cols-4 gap-y-10  w-[90%] mt-5 mb-10'>
          {state.restaurants.map((el) => (
            <Restaurant
              key={el.name}
              title={el.name}
              description={el.description}
              image={el.image}
              ratingsAverage={el.ratingsAverage}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Restaurants;

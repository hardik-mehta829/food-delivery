import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBurger,
  faBagShopping,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function Bottom() {
  const images = ['pic-3.avif', 'pic-4.avif', 'pic-5.avif'];
  const [image, setImage] = useState(0);
  // setInterval(() => {
  //   setImage((t) => (t + 1) % 3);
  // }, 4000);
  return (
    <div className='w-[50%]  flex justify-end mt-5'>
      <img src={`../../Images/pic-3.avif`} className='' />
      {/* <img
        src={`../../Images/pic-4.avif`}
        className={`transition duration-[1000] ease-linear ${
          image === 0 ? 'opacity-0' : 'opacity-100'
        } `}
      />
      <img src={`../../Images/pic-5.avif`} className='' /> */}
    </div>
  );
}

export default Bottom;

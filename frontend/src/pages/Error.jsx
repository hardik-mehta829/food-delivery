import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '../userSlice';
function Error() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(
    function () {
      setTimeout(function () {
        dispatch(Alert({ message: '' }));
      }, 1000);
    },
    [user.alert]
  );
  return (
    <div>
      <div
        className={`bg-green-600 text-white  position absolute top-4 left-[45%] text-center text-xl  rounded-md  ${
          user.alert === '' ? 'opacity-0' : 'opacity-100'
        }  p-2 `}
      >
        {user.alert}
      </div>
    </div>
  );
}

export default Error;

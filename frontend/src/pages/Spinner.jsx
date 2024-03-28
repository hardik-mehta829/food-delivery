import Loader from '../../src/Spinner2.gif';
function Spinner() {
  return (
    <div className='flex justify-center'>
      <img src={Loader} alt='No spinner' className='bg-black' />
    </div>
  );
}

export default Spinner;

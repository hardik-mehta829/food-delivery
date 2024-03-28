import Loader from '../../src/Spinner.gif';
function Spinner() {
  return (
    <div className='flex justify-center'>
      <img
        src={Loader}
        alt='No spinner'
        className='bg-black absolute top-0 -z-10'
      />
    </div>
  );
}

export default Spinner;

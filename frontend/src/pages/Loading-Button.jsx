import React, { useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
const LoadingButton = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <Flex gap='small' align='center' wrap='wrap'>
      <Button
        type='primary'
        size='large'
        className='text-2xl bg-green-500 mt-2'
        loading
      >
        Grant Location
      </Button>
    </Flex>
  );
};
export default LoadingButton;

import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { sortedMenu } from '../cartSlice';
import { useDispatch } from 'react-redux';
const items = [
  {
    key: '-1',
    label: 'Price (High to Low)',
  },
  {
    key: '1',
    label: 'Price (Low to High)',
  },
];
const menuStyle = {
  // Add your custom CSS properties here
};
function Filter() {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    console.log(e.key);
    dispatch(sortedMenu(e.key));
  };
  return (
    <Dropdown
      menu={{
        onClick: handleClick,
        items,
        selectable: true,
        style: { fontSize: '400px' },
      }}
      className='text-2xl'
    >
      <Typography.Link>
        <Space>
          Sort By
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
}
export default Filter;

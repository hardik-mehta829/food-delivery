import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PasswordModal({ modalOpen2, setIsModalOpen2 }) {
  const showModal = () => {
    setIsModalOpen2(true);
  };
  const handleOk = () => {
    setIsModalOpen2(false);
  };
  const handleCancel = () => {
    setIsModalOpen2(false);
  };
  return (
    <div>
      <Modal
        title=''
        open={modalOpen2}
        okButtonProps={{
          disabled: false,
          style: {
            backgroundColor: '#FF9800',
            marginTop: '3rem',
          },
        }}
        cancelButtonProps={{ style: { marginTop: '3rem' } }}
        okText='Save Changes'
        onOk={() => setIsModalOpen2(false)}
        onCancel={() => setIsModalOpen2(false)}
      >
        <p>New Password</p>
        <p>
          <input
            type='password'
            style={{
              border: '2px solid #FB8C00',
              width: '50%',
            }}
          />
        </p>
        <p>Confirm New Password</p>
        <input
          type='password'
          style={{ border: '2px solid #FB8C00', width: '50%' }}
        ></input>
      </Modal>
    </div>
  );
}
PasswordModal.propTypes = {
  modalOpen2: PropTypes.bool.isRequired,
  setIsModalOpen2: PropTypes.func.isRequired,
};
export default PasswordModal;

import { Modal } from "antd";

const changePasswordModal = (
  { title = "Change Password", isModalOpen = false, onOk },
  children
) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={onOk}>
      {children}
    </Modal>
  );
};

export default changePasswordModal;

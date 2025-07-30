import {
  Button,
  Modal,
} from "antd";

const UpdateModal = ({ openUpdate, toggleUpdate }:{openUpdate: boolean;toggleUpdate: () => void}) => {
  return (
    <Modal
      title="Change password"
      centered
      open={openUpdate}
      onCancel={toggleUpdate}
      width={700}
      closeIcon
      footer={null}
    >
      <h3>If you want to change Admin information you chave to meet anministration</h3>
          <Button type="primary" htmlType="submit" onClick={()=>toggleUpdate()}>
            Submit
          </Button>
    </Modal>
  );
};

export default UpdateModal;

import { Modal, Typography } from "antd";
import NotesContext from "../context/Context";
const ModalWindow = () => {
  const { Text } = Typography;
  return (
    <NotesContext.Consumer>
      {(context) => (
        <Modal
          visible={context.isModalVisible}
          onOk={context.handleOk}
          onCancel={context.handleCancel}
        >
          <Text style={{ fontSize: "20px" }}>
            Are you sure to delete {context.activeNote.title}?
          </Text>
        </Modal>
      )}
    </NotesContext.Consumer>
  );
};

export default ModalWindow;

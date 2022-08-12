import NotesContext from "../context/Context";
import { Button, Modal, Typography } from "antd";
const ModalWindow = () => {
const { Text } = Typography;
  return (
    <NotesContext.Consumer>
      {(context) => (
		<div>
        <Button onClick={context.showModal}>Delete</Button>
        <Modal visible={context.isModalVisible} onOk={context.handleOk} onCancel={context.handleCancel}>
          <Text>{context.getActiveNote().title}</Text>
          <Button onClick={() => context.onDeleteNote(context.getActiveNote().id)}>Delete</Button>
        </Modal>
		</div>
      )}
    </NotesContext.Consumer>
  );
};
export default ModalWindow;

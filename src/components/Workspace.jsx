import {Layout } from "antd";
import NotesContext from "../context/Context";
import ModalWindow from "./Modal";
import Input from "./Input";
import Title from "./Title";
const Workspace = () => {
  const { Content } = Layout;

  return (
    <NotesContext.Consumer>
      {(context) =>
        !context.activeNote ? (
          <Content className="no-active-note">No Active Note</Content>
        ) : (
          <Content
            style={{
              width: "50%",
              height: "100vh",
            }}
          >
            <ModalWindow />
            <Title />
            <Input />
          </Content>
        )
      }
    </NotesContext.Consumer>
  );
};

export default Workspace;

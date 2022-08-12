import { Button, Modal, Space, Typography, Layout } from "antd";
import ReactMarkdown from "react-markdown";
import NotesContext from "../context/Context";
import ModalWindow from "./ModalWindow";
const Workspace = () => {

  const { Header, Content, Input, Footer } = Layout;
  const { Text } = Typography;
  return (
    <NotesContext.Consumer>
      {(context) => (
        <div className="app-main">
          <Content>
            <Content>
              <ModalWindow/>
              <input
                type="text"
                id="title"
                placeholder="Note Title"
                value={context.getActiveNote().title}
                onChange={(e) => context.onEditField("title", e.target.value)}
                autoFocus
              />
              <textarea
                id="body"
                placeholder="Write your note here..."
                value={context.getActiveNote().body}
                onChange={(e) => context.onEditField("body", e.target.value)}
              />
            </Content>
          </Content>
          <Footer>
            <h1 className="preview-title">{context.getActiveNote().title}</h1>
            <ReactMarkdown className="markdown-preview">
              {context.getActiveNote().body}
            </ReactMarkdown>
          </Footer>
        </div>
      )}
    </NotesContext.Consumer>
  );
};

export default Workspace;

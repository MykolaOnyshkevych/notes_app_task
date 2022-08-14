import ReactMarkdown from "react-markdown";
import { Button, Layout, Typography } from "antd";
import NotesContext from "../context/Context";
const Title = () => {
  const { Footer, Content } = Layout;
  return (
    <NotesContext.Consumer>
      {(context) => (
        <Footer>
          <h1 className="preview-title">{context.activeNote.title}</h1>
          <ReactMarkdown className="markdown-preview">
            {context.activeNote.body}
          </ReactMarkdown>
          <Content>
            <Button style={{marginRight:'50px'}} onClick={context.showModal}>Delete</Button>
            <Button onClick={context.showFooter}>Edit</Button>
          </Content>
        </Footer>
      )}
    </NotesContext.Consumer>
  );
};

export default Title;

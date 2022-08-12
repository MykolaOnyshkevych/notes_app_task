import { Button, Modal, Space, Typography, Layout } from "antd";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import NotesContext from "../context/Context";
const Workspace = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };
  const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <NotesContext.Consumer>
      {(context) => (
        <div className="app-main">
          <Content>
            <Modal
              visible={context.isModalVisible}
              onOk={context.handleOk}
              onCancel={context.handleCancel}
            >
              <Text> Are you sure to Delete {activeNote.title}?</Text>
            </Modal>
          </Content>
          <Content>
          <h1 className="preview-title">{context.getActiveNote().title}</h1>
            <ReactMarkdown className="markdown-preview">
              {context.getActiveNote().body}
            </ReactMarkdown>
          </Content>
          <Button onClick={context.showModal}>Delete</Button>
          <Button onClick={context.showFooter}>Edit</Button>
          <Footer 

          style={{visibility: context.isFooterVisible ? 'visible' : 'hidden'}}
          >
            <input
              type="text"
              id="title"
              placeholder="Note Title"
              value={context.getActiveNote().title}
              onChange={(e) => onEditField("title", e.target.value)}
              autoFocus
            />
            <textarea
              id="body"
              placeholder="Write your note here..."
              value={context.getActiveNote().body}
              onChange={(e) => onEditField("body", e.target.value)}
            />
            <Button onClick={context.handleFooterClose}>Close Input</Button>
          </Footer>
        </div>
      )}
    </NotesContext.Consumer>
  );
};

export default Workspace;

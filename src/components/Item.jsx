import {Typography, Layout } from "antd";

import NotesContext from "../context/Context";
const Item = ({ note }) => {
  const { Content } = Layout;
  const { Text } = Typography;
  return (
    <NotesContext.Consumer>
      {(context) => (
        <Content
          className={`app-sidebar-note ${
            note.id === context.activeNote && "active"
          }`}
          onClick={() => context.setActiveNote(note.id)}
        >
          <Content style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {note.title}
            </Text>
            <Text style={{ color: "#fff", fontWeight: "100" }}>
              {note.body && note.body.substr(0, 100) + "..."}
            </Text>
          </Content>
          <Content style={{ display: "block", color: "#999" }}>
            Last Modified{" "}
            {new Date(note.lastModified).toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Content>
        </Content>
      )}
    </NotesContext.Consumer>
  );
};

export default Item;

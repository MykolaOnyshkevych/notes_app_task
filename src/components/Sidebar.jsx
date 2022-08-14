import { Button, Layout } from "antd";
import Item from "./Item";
import NotesContext from "../context/Context";
import SearchBar from "./SearchBar";
const { Header, Sider, Content } = Layout;
const Sidebar = () => {
  return (
    <NotesContext.Consumer>
      {(context) => (
        <Sider
          style={{
            position: "sticky",
            justifyContent: "center",
          }}
        >
          <Header
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <SearchBar />
          </Header>

          <Header>
            <Button onClick={context.onAddNote}>Add Note</Button>
          </Header>
          <Content
            style={{
              wordWrap: "break-word",
              overflowY: "scroll",
              height: "calc(100vh - 78px)",
            }}
          >
            {context.filteredPosts
              .sort((a, b) => b.lastModified - a.lastModified)
              .map((note) => (
                <Item note={note} />
              ))}
          </Content>
        </Sider>
      )}
    </NotesContext.Consumer>
  );
};

export default Sidebar;

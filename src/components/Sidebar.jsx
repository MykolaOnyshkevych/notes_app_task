import { Button, Layout } from "antd";
import Item from "./Item";
import NotesContext from "../context/Context";
import SearchBar from "./SearchBar";
const { Header, Sider, Content} = Layout;
const Sidebar = () => {
  
  return (
    <NotesContext.Consumer>
      {(context) => (
    <div className="app-sidebar">
    <Sider>
      <Header>
        <Button onClick={context.onAddNote}>Add Note</Button>
      </Header>
      <SearchBar/>
      <Content>
      <div className="app-sidebar-notes">
        {context.filteredPosts.sort(
    (a, b) => b.lastModified - a.lastModified
  ).map((note, i) => (
          <Item note={note}/>
        ))}
      </div>
      </Content>
    </Sider>
    </div>
      )}
      </NotesContext.Consumer>
  );
};

export default Sidebar;

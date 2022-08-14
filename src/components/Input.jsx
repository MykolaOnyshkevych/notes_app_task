import { Button, Layout } from "antd";
import NotesContext from "../context/Context";
const Input = () => {
	const { Footer } = Layout;
  return (
    <NotesContext.Consumer>
      {(context) => (
        <Footer
          style={{ visibility: context.isFooterVisible ? "visible" : "hidden" }}>
          <input
            type="text"
            placeholder="Note Title"
            value={context.activeNote.title}
            onChange={(e) =>
              context.onUpdateNote({
                ...context.activeNote,
                ["title"]: e.target.value,
                lastModified: Date.now(),
              })
            }
          />
          <textarea
            placeholder="Write your note here..."
            value={context.activeNote.body}
            onChange={(e) =>
              context.onUpdateNote({
                ...context.activeNote,
                ["body"]: e.target.value,
                lastModified: Date.now(),
              })
            }
          />
          <Button onClick={context.handleFooterClose}>Close Input</Button>
        </Footer>
      )}
    </NotesContext.Consumer>
  );
};
export default Input;

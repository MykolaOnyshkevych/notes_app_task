import NotesContext from "../context/Context";
const Item = ({ note }) => {
  return (
    <NotesContext.Consumer>
      {(context) => (
           
        <div
          className={`app-sidebar-note ${
            note.id === context.activeNote && "active"
          }`}
          onClick={() => context.setActiveNote(note.id)}
        >
          <p>{note.title}</p>
          <p>{note.body && note.body.substr(0, 100) + "..."}</p>
          <small className="note-meta">
            Last Modified{" "}
            {new Date(note.lastModified).toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>
      
      )}
    </NotesContext.Consumer>
  );
};

export default Item;

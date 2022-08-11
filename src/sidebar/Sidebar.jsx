import Dexie from "dexie";
import{useState} from "react"
import Modal from "react-modal";
const Sidebar = ({
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  modalIsOpen,
  setModalIsOpen,
  text,
  setText,
  filteredPosts
}) => {

  const sortedNotes = filteredPosts.sort((a, b) => b.lastModified - a.lastModified);
  return (
   
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <input
            value={text}
            onInput={e => setText(e.target.value)}
            type="text"
            placeholder="Search notes"
            title="s"

        />
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <button onClick={()=> setModalIsOpen(true)}>Delete</button>
            <p>{title}</p>
            <Modal isOpen={modalIsOpen}>
                  <div className="note-title">
                    <strong>{title}</strong>
                    <button onClick={(e) => onDeleteNote(id)}>Delete</button>
                  </div>
            </Modal>
            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

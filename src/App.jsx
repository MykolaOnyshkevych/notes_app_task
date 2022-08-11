import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import Dexie from "dexie";

const filterPosts = (notes, text) => {
  if (!text) {
      return notes;
  }

  return notes.filter((note) => {
      const noteTitle = note.title.toLowerCase();
      const noteBody = note.body.toLowerCase();
      return noteTitle.includes(text)||noteBody.includes(text);
  });
};

function App() {
    //set the database 
    const db = new Dexie("NotesStorage");
    //create the database store
    db.version(1).stores({
        notes: "id, title, content"
    })
  


const [modalIsOpen, setModalIsOpen] = useState(false);
const [text, setText] = useState(false);


  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
   const [activeNote, setActiveNote] = useState(false);
   const filteredPosts = filterPosts(notes, text);


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };


  const onDeleteNote = (noteId) => {
    setModalIsOpen(false);
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };







  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        modalIsOpen = {modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        text={text}
        setText={setText}
        filteredPosts={filteredPosts}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;


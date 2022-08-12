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
    // database 
    const db = new Dexie("NotesStorage");
    db.version(1).stores({
        notesstore: "++id, title, body, lastModified"
    })
  


const [modalIsOpen, setModalIsOpen] = useState(false);
const [text, setText] = useState(false);


  const [notes, setNotes] = useState([]);





useEffect(() => {
    const getPosts = async() => {
        let allNotes = await db.notesstore.toArray();
        setNotes(allNotes);
    }
    getPosts();
}, [])


	const onAddNote = () => {
        const newNote = {
          id: uuid(),
          title: "Untitled Note",
          body: "",
          lastModified: Date.now(),
        };
          
        db.notesstore.add(newNote).then(async() => {
            setNotes([newNote, ...notes]);
            setActiveNote(newNote.id); 
        });    
        
    }


   const [activeNote, setActiveNote] = useState(false);
   const filteredPosts = filterPosts(notes, text);

  const onDeleteNote = async(noteId) => {
    setModalIsOpen(false);
    db.notesstore.delete(noteId);
    setNotes(notes.filter(({ id }) => id !== noteId));
  };


  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        db.notesstore.update(note.id, updatedNote);
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


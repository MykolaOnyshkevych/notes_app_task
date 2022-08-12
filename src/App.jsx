import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Workspace from "./components/Workspace";
import Sidebar from "./components/Sidebar";
import Dexie from "dexie";
import "antd/dist/antd.css";
import { Layout } from "antd";
import NotesContext from "./context/Context";

const filterPosts = (notes, text) => {
  if (!text) {
    return notes;
  }

  return notes.filter((note) => {
    const noteTitle = note.title.toLowerCase();
    const noteBody = note.body.toLowerCase();
    const loweredText = text.toLowerCase();
    return noteTitle.includes(loweredText) || noteBody.includes(loweredText);
  });
};

const App = ({ children }) => {
  const db = new Dexie("NotesStorage");
  db.version(1).stores({
    notesstore: "++id, title, body, lastModified",
  });

  const [text, setText] = useState(false);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const filteredPosts = filterPosts(notes, text);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      let allNotes = await db.notesstore.toArray();
      setNotes(allNotes);
    };
    getPosts();
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    db.notesstore.add(newNote).then(async () => {
      setNotes([newNote, ...notes]);
      setActiveNote(newNote.id);
    });
  };

  const onDeleteNote = async (noteId) => {
    setIsModalVisible(false);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const onEditField = (field, value) => {
    onUpdateNote({
      ...getActiveNote(),
      [field]: value,
      lastModified: Date.now(),
    });
  };

  return (
    <NotesContext.Provider value={{ 
    activeNote,
    getActiveNote,
    onEditField, 
    setActiveNote, 
    text, 
    setText, 
    onAddNote,
    onDeleteNote,
    showModal,
    handleOk,
    handleCancel,
    filteredPosts,
    isModalVisible}}>
      <Layout>
        <Sidebar/>
         <Workspace
          activeNote={getActiveNote()}
        />
      </Layout>
    </NotesContext.Provider>
  );
};

export default App;

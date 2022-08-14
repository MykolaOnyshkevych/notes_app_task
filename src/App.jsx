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

  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const filteredPosts = filterPosts(notes, text);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

  const showFooter = () => {
    setIsFooterVisible(true);
  };
  const handleFooterClose = () => {
    setIsFooterVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    db.notesstore.delete(getActiveNote().id);
    setNotes(notes.filter(({ id }) => id !== getActiveNote().id));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      let allNotes = await db.notesstore.toArray();
      setNotes(allNotes);
    };
    getPosts();
  }, []);
  return (
    <NotesContext.Provider
      value={{
        activeNote: getActiveNote(),
        setActiveNote,
        text,
        setText,
        showFooter,
        onAddNote,
        showModal,
        handleOk,
        onUpdateNote,
        handleCancel,
        filteredPosts,
        isFooterVisible,
        setIsFooterVisible,
        handleFooterClose,
        isModalVisible,
      }}
    >
      <Layout>
        <Sidebar />
        <Workspace />
      </Layout>
    </NotesContext.Provider>
  );
};

export default App;

import React, {useState, useRef, useEffect} from 'react';
import TextEditor from './TextEditor';
import SideBar from './SideBar'
import Preview from './Preview';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes): []);
  const [activeNote, setActiveNote] = useState({});
  const [isSideBarVisible, setSideBarVisibility] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const isEditorVisible = useRef(false);
  const isPreviewVisible = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])


  
  function onAddNote() {
    const newNote = {
      id: uuidv4(),
      title: "Untitled",
      mainContent:"",
      timeStamp: new Date().toLocaleString('en-US', { timeZone: 'MST' }).slice(0,16)
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    onEditNote();
  }
  
  function onSaveNote(mainContent, title, date) {
    isEditorVisible.current = false;
    isPreviewVisible.current = true;
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(note => {
        if (note.id === activeNote.id) {
          return {
            ...note,
            mainContent: mainContent,
            title: title,
            timeStamp: date
          };
        }
        return note;
      });
      return updatedNotes;
    });
    const updatedNote = {
      ...activeNote,
      mainContent: mainContent,
      title: title,
      timeStamp: date
    };
    selectActiveNote(updatedNote);
    
    navigate(window.location.pathname.replace('/edit', ''))
  }
  
  function onDeleteNote(noteId) {
    const answer = window.confirm("Are you sure?");
    if(!answer) return;
    isEditorVisible.current = false;
    isPreviewVisible.current = false;
    setNotes(prevState => prevState.filter(note => note.id !== noteId));

  }
  
  function onEditNote() {
    const currentPath = window.location.pathname; 
    navigate(`${currentPath}/edit`);
    isEditorVisible.current = true;
    isPreviewVisible.current = false;
    setShouldRender(!shouldRender);
  }
  
  function selectActiveNote(note) {
    isEditorVisible.current = false;
    isPreviewVisible.current = true;
    setActiveNote(note);
  }
  
  function toggleSideBar() {
    setSideBarVisibility(!isSideBarVisible);
  } 
 
  return (
    <>
      <div id="top">
        <button id="sideBarToggle" className="indigoButton" onClick={toggleSideBar}>&#9776;</button>
        <div id="centerTitle">
          <div id="lotionTitle">Lotion</div>
          <div id="lotionSecondaryTitle">Like Notion, but worse.</div>
        </div>
      </div>
      <main>
        {isSideBarVisible && (
          <SideBar
            notes={notes}
            onAddNote={onAddNote}
            activeNote={activeNote}
            selectActiveNote={selectActiveNote}
          />
        )}
        {isEditorVisible.current && (
          <TextEditor
            onSaveNote={onSaveNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
          />
        )}
        {isPreviewVisible.current && (
          <Preview
            activeNote={activeNote}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
          />
        )}
        {!isEditorVisible.current && !isPreviewVisible.current && (
          <div id="note-placeholder">
            <div>Select a Note, or Create a New One</div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

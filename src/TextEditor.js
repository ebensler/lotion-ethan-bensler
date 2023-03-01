import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({onSaveNote, onDeleteNote, activeNote}) {
  const quillRef = useRef();
  const [editorValue, setEditorValue] = useState(activeNote.mainContent);
  const [titleValue, setTitleValue] = useState(activeNote.title);
  const [dateValue, setDateValue] = useState(activeNote.timeStamp);

  useEffect(() => {
    setEditorValue(activeNote.mainContent);
    setTitleValue(activeNote.title);
    setDateValue(activeNote.timeStamp);
  }, [activeNote]);

  function handleEditorChange(value) {
    setEditorValue(value);
  }

  function handleTitleChange(event) {
    setTitleValue(event.target.value);
  }

  function handleDateChange(event) {
    setDateValue(event.target.value);
  }


  return (
    <div className="editor-area">
      <div className="text-header">
        <div className="title-container">
          <input type="text" className="note-title-main" id="note-title-text-field" value={titleValue} onChange={handleTitleChange}></input>
          <div className="date-container">
            <input id="date-selector" type="datetime-local" value={dateValue} onChange={handleDateChange}  />
          </div>
        </div>
        <div className="buttons-container">
          <button  className="indigoButton editor-buttons" onClick={() => onSaveNote(editorValue, titleValue, dateValue)}>Save</button>
          <button  className="indigoButton editor-buttons" onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
        </div>
      </div>
      <div id="main-text-editor">
        <ReactQuill
          spellCheck={false}
          ref={quillRef}
          value={editorValue}
          onChange={handleEditorChange}
          style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', flex: '1'}}
          modules={{clipboard: {matchVisual: false}}}
        />
      </div>
    </div>
  );
}

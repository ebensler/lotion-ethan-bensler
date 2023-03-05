import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Note({note, selectActiveNote, activeNote}) {
         
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",  
        };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
      };

  return (
    <div className={`indigoButton note-element ${note.id === activeNote.id ? "active" : ""}`} onClick = {() => selectActiveNote(note)}>
        <div className="note-title">{note.title}</div>
        <div className="note-time-stamp">{formatDate(note.timeStamp)}</div>
        <ReactQuill readOnly={true} modules={{ toolbar: false }} value={ note.mainContent.substr(0, 50) + "..." }></ReactQuill>
    </div>
  )
}

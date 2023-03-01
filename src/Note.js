import React from 'react'

export default function Note({note, selectActiveNote, activeNote}) {

    function handleTextOverflow(mainContent) {
        if (mainContent.length <= 75) {
          return mainContent;
        } else {
          return mainContent.substring(0, 75) + '...';
        }
      }
      
      
      
      
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
        <div className="note-main-content" dangerouslySetInnerHTML={{ __html: handleTextOverflow(note.mainContent)}}/>
    </div>
  )
}

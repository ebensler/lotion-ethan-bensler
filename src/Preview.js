import React from 'react'
import ReactQuill from 'react-quill';

export default function Preview({ activeNote, onDeleteNote, onEditNote }) {
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
        <div className="editor-area">
            <div className="text-header">
                <div className="title-container">
                    <div className="note-title-main">{activeNote.title}</div>
                    <div id='preview-date' className='date-container'>{formatDate(activeNote.timeStamp)}</div>
                </div>
                <div className="buttons-container">
                    <button className="indigoButton editor-buttons" onClick={() => onEditNote()}>Edit</button>
                    <button className="indigoButton editor-buttons" onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
                </div>
            </div>
            <ReactQuill id = "preview-text-main" readOnly={true} modules={{ toolbar: false }} value={activeNote.mainContent}/>
        </div>
    )
}

import React, {useState} from 'react'
import NoteList from './NoteList'


export default function SideBar({notes, onAddNote, activeNote, selectActiveNote}) {
   
  
  return (
    <div id="sideBar">
      <div id="sideBarHeader">
        <div id="notesTitle">Notes</div>
        <button id="addNoteButton" className="indigoButton" onClick={onAddNote}>+</button>
      </div>
      <div id="noteList">
        <NoteList notes = {notes} selectActiveNote = {selectActiveNote} activeNote={activeNote}/>
      </div>
    </div>
  )
}

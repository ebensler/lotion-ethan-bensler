
import NoteList from './NoteList'


export default function SideBar({ notes, onAddNote, activeNote, selectActiveNote, isEditorVisible, isPreviewVisible }) {


  return (
    <div id="sideBar">
      <div id="sideBarHeader">
        <div id="notesTitle">Notes</div>
        <button id="addNoteButton" className="indigoButton" onClick={onAddNote}>+</button>
      </div>
      <div id="noteList">
        <NoteList
          notes={notes}
          selectActiveNote={selectActiveNote}
          activeNote={activeNote}
          isEditorVisible={isEditorVisible}
          isPreviewVisible={isPreviewVisible}
        />
      </div>
    </div>
  )
}

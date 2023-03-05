import React from 'react';
import Note from './Note';
import { Link } from 'react-router-dom';


export default function NoteList({ notes, selectActiveNote, activeNote, isEditorVisible, isPreviewVisible }) {

    if (notes.length === 0) {
        isEditorVisible.current = false;
        isPreviewVisible.current = false;
        return (
            <div id="empty-list-placeholder">No Notes Yet</div>
        );
    }

    return (
        <div>
            {notes.map((note, index) => {
                return (

                    <Link to={`/note/${index + 1}`} key={note.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Note
                            key={note.id}
                            note={note}
                            selectActiveNote={selectActiveNote}
                            activeNote={activeNote}
                        />
                    </Link>
                )

            })}

        </div>
    )
}

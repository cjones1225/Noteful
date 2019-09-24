import React, {Component} from 'react';
import FolderListNote from './FolderListNote';
import NoteContext from './NoteContext';
import './NoteDisplay.css'

export default class NoteDisplay extends Component {
    static contextType = NoteContext
    
    render(){
        const notes = this.context.Notes.map(note => note);

        const note = notes.find(n => n.id === this.props.match.params.noteId)

        return(
            <div className='note-display'>
                <FolderListNote Data={note.folderId}/>
                <article className='Note'>
                    <h2>{note.name}</h2>
                    {note.content}
                </article>
            </div>
        )
    }
}
import React, {Component} from 'react';
import FolderListNote from './FolderListNote';
import NoteContext from './NoteContext';
import './NoteDisplay.css'

export default class NoteDisplay extends Component {
    static contextType = NoteContext
    
    render(){
        const notes = this.context.Notes.map(n => n);
        const note = notes.find(n => n.id == this.props.match.params.noteId);
        return(
            <div className='note-display'>
                <FolderListNote Data={note.folder_id}/>
                <article className='Note'>
                    <h2>{note.name}</h2>
                    {note.content}
                </article>
            </div>
        )
    }
}
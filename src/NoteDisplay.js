import React, {Component} from 'react';
import FolderListNote from './FolderListNote';
import NoteContext from './NoteContext';

export default class NoteDisplay extends Component {
    static contextType = NoteContext
    
    render(){
        const notes = this.context.Notes.map(note => note);

        const note = notes.find(n => n.id === this.props.match.params.noteId)

        return(
            <div classname='note-display'>
                <FolderListNote Data={note.folderId}/>
                <article classname='Note'>
                    <h2>{note.name}</h2>
                    {note.content}
                </article>
            </div>
        )
    }
}
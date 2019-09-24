import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteContext from './NoteContext';

export default class FolderListNote extends Component {
    static contextType = NoteContext;

    render(){
        const fold = this.context.folders.map(f => f);
        const folder = fold.find(f => f.id === this.props.Data)

        return(
            <ul className='NoteSpecific'>
                <NavLink className='go-back' to={`/`}>Go Back</NavLink>
                <li className='folder-note-show' key={this.props.Data}>{folder.name}</li>
            </ul>
        )
    }
}

FolderListNote.propTypes = {
    Data: PropTypes.string
}
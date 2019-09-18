import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import NoteContext from '../NoteContext';

export default class FolderList extends Component{
    static contextType = NoteContext

    render(){
        return(
            <ul classname="folder-section">
                {this.context.folders.map(folder=>{
                    return <li classname="folder" key={folder.id}><NavLink classname="linktofolder" activeClassName='selected-folder' to={`/folder/${folder.id}`}>{folder.name}</NavLink></li>})}
                    <NavLink classname="AddFolderLink" to={`/add-folder`}>Add Folder</NavLink>
            </ul>
        )
    }
}
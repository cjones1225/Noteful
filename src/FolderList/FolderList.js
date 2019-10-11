import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import NoteContext from '../NoteContext';
import config from '../config';

export default class FolderList extends Component{
    static contextType = NoteContext

    deleteRequest = (folder) => {

        fetch(`${config.API_ENDPOINT}/folders/${folder}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) return response.json().then(error => {
                    throw error
                })
                return response.json();
            })
            .then(data => {
                this.context.Delete(folder);
            })
            .catch(error => {
                console.error({ error });
            });
    };

    render(){
        return(
            <ul className="folder-section">
                {this.context.folders.map(folder=>{
                    return <li className="folder" key={folder.id}><NavLink className="linktofolder" activeClassName='selected-folder' to={`/folder/${folder.id}`}>{folder.name}</NavLink><button onClick={() => { this.deleteRequest(folder.id) }} className="folder-delete-button">Delete</button></li>})}
                    <NavLink className="AddFolderLink" to={`/add-folder`}>Add Folder</NavLink>
            </ul>
        )
    }
}
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NoteContext from "./NoteContext";

export default class FolderList extends Component {
  static contextType = NoteContext;

  render() {
    return (
      <ul className="folder-section">
        {this.context.folders.map(folder => {
          return (
            <li className="folder" key={folder.id}>
              <NavLink
                className="linktofolder"
                activeClassName="selected-folder"
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          );
        })}
        <NavLink className="Addfolderlink" to={`/AddFolder`}>
          Add Folder
        </NavLink>
      </ul>
    );
  }
}

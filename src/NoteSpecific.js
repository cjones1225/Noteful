import React, { Component } from "react";
import { Link } from "react-router-dom";
import NoteContext from "./NoteContext";
import PropTypes from "prop-types";
import config from "./config";

export default class NoteSpecific extends Component {
  static contextType = NoteContext;

  deletRequest = note => {
    fetch(`${config.API_ENDPOINT}/notes/${note}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw error;
          });
        }
        return response.json();
      })
      .then(data => {
        this.context.Delete(note)
      })
      .catch(error => {
        console.error(error)
      });
  };
  render() {
    return (
      <ul className="note-collection">
        {this.props.notesdata.map(note => {
          return (
            <li className="NoteBox" key={note.id}>
              <Link className="notelinks" to={`/note/${note.id}`}>
                {note.name}
              </Link>
              <p>{note.modified}</p>
              <button
                onClick={() => {
                  this.deletRequest(note.id);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          );
        })}
        <Link className="AddNoteLink" to={`/AddNote`}>
          Add Note
        </Link>
      </ul>
    );
  }
}

NoteSpecific.propTypes = {
  notesdata: PropTypes.arrayOf(PropTypes.object)
};

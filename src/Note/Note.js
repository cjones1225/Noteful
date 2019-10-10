import React, { Component } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";
import "./Note.css";
import config from '../config'


export default class Note extends Component {
  static contextType = NoteContext;

  deleteRequest = (note) => {

    fetch(`${config.API_ENDPOINT}/notes/${note}`, {
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
        this.context.Delete(note);
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    const notes = this.context.Notes.map(note => {
      return <li className="NoteBox" key={note.id}><Link className="notelinks" to={`/note/${note.id}`}>{note.name}</Link><p>{note.modified}</p><button onClick={() => {this.deleteRequest(note.id)}} className="delete-button">Delete</button></li>
    });

    return (
      <ul className='note-collection'>
        {notes}
        <Link className='AddNoteLink' to={'/add-note'}>Add Note</Link>
      </ul>
    );
  }
}

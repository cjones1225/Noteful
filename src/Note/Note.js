import React, { Component } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../NoteContext";
import "./Note.css";


export default class Note extends Component {
  static contextType = NoteContext;

  deleteRequest = (note) => {

    fetch(`http://localhost:9090/notes/${note}`, {
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
      return <li classname="NoteBox" key={note.id}><Link classname="notelinks" to={`/note/${note.id}`}>{note.name}</Link><p>{note.modified}</p><button onClick={() => {this.deleteRequest(note.id)}} classname="delete-button">Delete</button></li>
    });

    return (
      <ul classname='note-collection'>
        {notes}
        <Link classname='AddNoteLink' to={'/add-note'}>Add Note</Link>
      </ul>
    );
  }
}

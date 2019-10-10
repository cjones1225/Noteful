import React, { Component } from "react";
import FolderList from "../FolderList/FolderList";
import NoteSpecific from "../NoteSpecific";
import NoteContext from "../NoteContext";
import PropTypes from "prop-types";
import Error from "../ErrorBoundary/ErrorBoundary";

export default class Folder extends Component {
  static contextType = NoteContext;

  render() {
    const notes = this.context.Notes.filter(n => n.folder_id == this.props.match.params.folderId);
    console.log(notes)
    const filteredNotes = notes.map(note => {
      return <li className="NoteBox" key={note.id}>{note.name}<button onClick={() => { this.deleteRequest(note.id) }} className="delete-button">Delete</button></li>
    })
    return (
      <main className="main-page">
        <div className="container">
          <section className="sidebar-main">
            <FolderList />
          </section>
          <main className="main-main">
            <Error>
              <NoteSpecific notesdata={notes} />
            </Error>
            {/* <section>
            {filteredNotes}
            </section> */}
          </main>
        </div>
      </main>
    );
  }
}

NoteSpecific.propTypes = {
  Data: PropTypes.array
};

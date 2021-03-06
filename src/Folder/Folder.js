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

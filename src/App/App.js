import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import NoteContext from "../NoteContext";
import config from "../config";
import "./App.css";
import AddFolder from "../AddFolder/AddFolder";
import Data from "../dummy-store";
import AddNote from "../AddNote/AddNote";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data,
      folders: [],
      Notes: [],
      folderObject: []
    };
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "GET"
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
        this.setState({ folders: data });
      })
      .catch(error => {
        console.error(error);
      });
    //fetch request notes

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "GET"
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          Notes: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  deletenote = newNotes => {
    const newData = this.state.Notes.filter(n => n.id !== newNotes);

    this.setState({
      Notes: newData
    });
  };

  createFolder = NewFolder => {
    const NewObject = {
      name: NewFolder,
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(NewObject),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        this.setState({
          folders: [...this.state.folders, NewObject]
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  addNote = (Note, content, folder) => {
    const NoteObject = {
      name: Note,
      content: content,
      folderId: folder,
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      modified: "2019-09-09T14:07:00.000Z"
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(NoteObject),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        this.setState({
          Notes: [...this.state.Notes.NoteObject]
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" componen={NotePageMain} />
      </>
    );
  }

  render() {
    const value = {
      data: this.state.Data,
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      Create: this.createFolder,
      addNotes: this.addNote
    };
    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App_main">{this.renderMainRoutes()}</main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;

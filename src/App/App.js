import React, { Component } from "react";
import Main from '../Main/Main';
import Data from "../dummy-store";
import { Route, Link } from "react-router-dom";
import NoteContext from "../NoteContext";
import config from "../config";
import "./App.css";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import Folder from '../Folder/Folder';
import NoteDisplay from '../NoteDisplay';

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

  deleteNote = newNotes => {
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
      folder_id: folder,
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
          Notes: [...this.state.Notes, NoteObject]
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const contextValue = {
      data: this.state.Data,
      Notes: this.state.Notes,
      folders: this.state.folders,
      Delete: this.deleteNote,
      Create: this.createFolder,
      addNote: this.addNote
    };
    return (
      <NoteContext.Provider value={contextValue}>
        <main className='app'>
          <header className='header-main'><Link className='home-link' to="/"><h1>Noteful</h1></Link></header>
          <Route path='/folder/:folderId' component={Folder}/>
          <Route path='/note/:noteId' component={NoteDisplay}/>
          <Route exact path='/' component={Main}/>
          <Route path='/add-note' component={AddNote}/>
          <Route path='/add-folder' component={AddFolder}/>
        </main>
      </NoteContext.Provider>
    );
  }
}

export default App;

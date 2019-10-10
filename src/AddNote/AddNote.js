import React, { Component } from "react";
import NoteContext from "../NoteContext";
import ValidationError from "../ValidationError";

export default class AddNote extends Component {
  static contextType = NoteContext;

  constructor(props) {
    super(props);
    this.Input = React.createRef();
    this.content = React.createRef();
    this.folder = React.createRef();
    this.state = {
      nametouched: false,
      name: ""
    };
  }

  handleSumbit(event) {
    event.preventDefault();
    const content = this.content.current.value;
    const folder = this.folder.current.value;
    this.context.addNote(this.state.name, content, folder);
    this.props.history.push("/");
  }

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }

  updateName(name) {
    this.setState({
      name: name,
      touched: true
    });
  }

  render() {
    const nameError = this.validateName();
    const options = this.context.folders.map(f => {
      return (
        <option key={f.id} value={f.id}>
          {f.name}
        </option>
      );
    });
    return (
      <div className="AddNoteForm">
        <form onSubmit={e => this.handleSumbit(e)}>
          <legend className="addNoteTitle">Add Note</legend>
          <label className="labels" htmlFor="addName">
            Name:
          </label>
          <input
            className="addNoteInputs"
            type="text"
            name="addName"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.touched && <ValidationError message={nameError} />}
          <label className="labels" htmlFor="addContent">
            Content:
          </label>
          <input
            className="addNoteInputs"
            type="text"
            name="addContent"
            id="addContent"
            ref={this.content}
          />
          <label className="labels" htmlFor="addNote">
            Folder:
          </label>
          <select className="addNoteInputs" ref={this.folder}>
            {options}
          </select>
          <button className="addNote" disabled={this.validateName()}>
            Add
          </button>
        </form>
        <button
          className="back-button"
          id="back-button"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
      </div>
    );
  }
}

import React, { Component } from "react";
import NoteContext from "../NoteContext";
import ValidationError from "../ValidationError";

class AddFolder extends Component {
  static contextType = NoteContext;

  constructor(props) {
    super(props);
    this.Input = React.createRef();
    this.state = {
      NameofFolder: ""
    };
  }

  updateName(name) {
    this.setState({ NameofFolder: name, touched: true });
  }

  validateName() {
    const name = this.state.NameofFolder.trim();
    const folders = this.context.folders.map(f => f.name);
    const boolean = folders.find(f => f === name);
    if (name.length === 0) {
      return "Name is required";
    } else if (boolean) {
      return "You already used that name";
    }
  }

  handleSumbit(event) {
    event.preventDefault();
    const inputvalue = this.Input.current.value;

    this.context.Create(inputvalue);
    this.props.history.push("/");
  }

  render() {
    const nameError = this.validateName();
    return (
      <div className="AddFolder-Page">
        <form className="addFolderForm" onSubmit={e => this.handleSumbit(e)}>
          <label className="addFolderTitle" htmlFor="addFolder">
            Add Folder
          </label>
          <input
            onChange={e => this.updateName(e.target.value)}
            type="text"
            name="addFolder"
            ref={this.Input}
          />
          <button disabled={this.validateName()} className="addFolder">
            Add
          </button>
          {this.state.touched && <ValidationError message={nameError} />}
        </form>
        <button
          className="back-button"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
      </div>
    );
  }
}

export default AddFolder;

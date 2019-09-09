import React, { Component } from "react";

export default class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFrom(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Error...</h2>;
    }
    return this.props.children;
  }
}

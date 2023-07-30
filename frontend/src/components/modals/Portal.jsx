import { Component } from "react";
import ReactDOM from "react-dom";

const portal = document.getElementById("portal");

export default class Portal extends Component {
  constructor() {
    super();
    this.element = document.createElement("div");
  }

  componentDidMount = () => {
    portal.appendChild(this.element);
  };

  componentWillUnmount = () => {
    portal.removeChild(this.element);
  };

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.element);
  }
}

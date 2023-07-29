import React, { Component } from "react";
import Portal from "./Portal";

export default class Modal extends Component {
  render() {
    const { children, active } = this.props;

    return (
      <Portal className="Portal">
        {active && (
          <section className="Portal-wrapper">
            <section className="Portal-window">
              <div className="Portal-div">{children}</div>
            </section>
          </section>
        )}
      </Portal>
    );
  }
}

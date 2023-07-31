import React, { Component } from "react";
import Portal from "./Portal";

export default class Modal extends Component {
  render() {
    const { children, active, toggle, resize } = this.props;

    return (
      <Portal className="Portal">
        {active && (
          <section className="Portal-wrapper">
            <section className={`Portal-window ${resize}`}>
              <section className="Modal-header">
                <svg
                  className="Modal-btnClose"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  onClick={toggle}
                >
                  <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                </svg>
              </section>
              <div className="Portal-div">{children}</div>
            </section>
          </section>
        )}
      </Portal>
    );
  }
}

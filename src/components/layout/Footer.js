import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <nav className="navbar sticky-bottom navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="./">
            &copy; WordHunter 2019
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="https://www.facebook.com/Niweera">
                  <i
                    style={{ fontSize: "25px" }}
                    className="fab fa-facebook-square"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://twitter.com/Niweera">
                  <i
                    style={{ fontSize: "25px" }}
                    className="fab fa-twitter-square"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/Niweera/wordhunter"
                >
                  <i style={{ fontSize: "25px" }} className="fab fa-github" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

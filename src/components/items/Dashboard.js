import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { getWordnik, getChuck, getQuote } from "../../actions/itemActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWordnik();
    this.props.getChuck();
    this.props.getQuote();
  }

  render() {
    const { wordnik, chuck, quote } = this.props.item;
    return (
      <div className="container mt-4 mb-4">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="h2">
              Welcome to WordHunter!
              <br /> Find the words you've always been looking for...
            </h1>
            <hr />
            <h1 className="h4 mt-5">
              Word of The Day <br />{" "}
              <span className="h6 font-italic">
                Courtesy of{" "}
                <a
                  style={{ color: "black" }}
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.wordnik.com"
                >
                  Wordnik
                </a>
              </span>
            </h1>
            <hr />
            {wordnik ? (
              <div>
                <h1 className="h4">"{wordnik.word}"</h1>
                <h1 className="h5 font-italic">
                  -{wordnik.definitions[0].text}
                </h1>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <p className="h5 mb-4">
              Input an array of characters seperated by a comma to find out the
              words that can be created.
            </p>
            <form>
              <div className="form-row">
                <div className="col-md-3" />
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Characters"
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-dark mb-2 btn-block"
                    disabled
                  >
                    Search
                  </button>
                </div>
                <div className="col-md-3" />
              </div>
              <p className="h6">Word searching is coming soon!</p>
            </form>
          </div>
        </div>

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="h4">Today's Inspiration</h1>
            <hr />
            {quote ? (
              <div>
                <h1 className="h4">"{quote.quote.body}"</h1>{" "}
                <h1 className="h5">-{quote.quote.author}</h1>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="h4">Chuck Norris Fun Fact!</h1>
            <hr />
            {chuck ? <h1 className="h4">"{chuck.value.joke}"</h1> : <Spinner />}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getWordnik: PropTypes.func.isRequired,
  getChuck: PropTypes.func.isRequired,
  getQuote: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  item: state.item
});

export default connect(
  mapStateToProps,
  { getWordnik, getChuck, getQuote }
)(Dashboard);

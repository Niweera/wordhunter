import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import {
  getWordnik,
  getChuck,
  getQuote,
  getWords,
  setVowelsError,
  clearData
} from "../../actions/itemActions";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      errors: null,
      showWord: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getWordnik();
    this.props.getChuck();
    this.props.getQuote();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({ showWord: true });
    e.preventDefault();

    const { word } = this.state;

    const sendWord = word.toLowerCase();
    var letterArray = sendWord.replace(/[^A-Za-z]/g, "");

    if (
      !letterArray.includes("a") &&
      !letterArray.includes("e") &&
      !letterArray.includes("i") &&
      !letterArray.includes("o") &&
      !letterArray.includes("u") &&
      !letterArray.includes("y")
    ) {
      this.props.clearData();
      this.props.setVowelsError();
    } else {
      this.props.clearData();
      this.props.getWords(letterArray);
    }
  }

  render() {
    const { word, errors, showWord } = this.state;
    const { wordnik, chuck, quote, words, loading } = this.props.item;

    return (
      <div className="container mt-4 mb-4">
        <div
          className="jumbotron jumbotron-fluid"
          style={{
            backgroundColor: "#3b3a30",
            textShadow: "0 1px 3px rgba(0,0,0,.5)",
            color: "white"
          }}
        >
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
                  style={{ color: "white" }}
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

        <div
          className="jumbotron jumbotron-fluid"
          style={{
            backgroundColor: "#3b3a30",
            textShadow: "0 1px 3px rgba(0,0,0,.5)",
            color: "white"
          }}
        >
          <div className="container">
            <p className="h5 mb-4">
              Enter letters to find out the words that can be created (No need
              to seperate characters with a space or a comma).
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="col-md-3" />
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Letters"
                    name="word"
                    value={word}
                    onChange={this.onChange}
                    autoFocus
                    required
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <button type="submit" className="btn btn-dark mb-2 btn-block">
                    Search
                  </button>
                </div>
                <div className="col-md-3" />
              </div>
              {showWord ? (
                <div>
                  {!loading || (errors && errors.error) ? (
                    <div>
                      {(words && words.length > 0) ||
                      ((errors && errors.error) ||
                        (errors && errors.vowelsError)) ? (
                        <div>
                          {words && words.length > 0 ? (
                            <div>
                              {words.map(word => (
                                <div
                                  className="container mt-3 border border-dark"
                                  key={word.word}
                                >
                                  <h1 className="h4">"{word.word}"</h1>
                                  <h1 className="h5">-{word.definition}</h1>
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {errors && (
                            <div className="container text-danger mt-4">
                              {errors.error}
                            </div>
                          )}
                          {errors && !errors.error && (
                            <div className="container text-danger mt-4">
                              {errors.vowelsError}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="container text-danger mt-4">
                            You can't create words with the given characters!
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </div>
              ) : null}
            </form>
          </div>
        </div>

        <div className="jumbotron jumbotron-fluid  border border-secondary">
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

        <div className="jumbotron jumbotron-fluid  border border-secondary">
          <div className="container">
            <h1 className="h4">Chuck Norris Fun Fact!</h1>
            <hr />
            {chuck ? (
              <h1 className="h4">
                "{chuck.value.joke.replace(/&quot;/g, '"')}"
              </h1>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getWordnik: PropTypes.func.isRequired,
  getWords: PropTypes.func.isRequired,
  getChuck: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  setVowelsError: PropTypes.func.isRequired,
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
  { getWordnik, getChuck, getQuote, getWords, setVowelsError, clearData }
)(Dashboard);

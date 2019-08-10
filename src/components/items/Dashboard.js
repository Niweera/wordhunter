import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import {
  getWordnik,
  getChuck,
  getQuote,
  getWords
} from "../../actions/itemActions";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      word: "",
      showWords: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getWordnik();
    this.props.getChuck();
    this.props.getQuote();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
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
      this.setState({
        errors: { error: "You can't create words with the given characters!" }
      });
    } else {
      this.setState({
        errors: {}
      });
      this.setState({ showWords: true });
      this.props.getWords(sendWord);
    }
  }

  render() {
    const { word, showWords, errors } = this.state;
    const { wordnik, chuck, quote, words, loading } = this.props.item;
    return (
      <div className="container mt-4 mb-4">
        <div className="jumbotron jumbotron-fluid  border border-secondary">
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

        <div className="jumbotron jumbotron-fluid border border-secondary">
          <div className="container">
            <p className="h5 mb-4">
              Enter characters to find out the words that can be created (No
              need to seperate characters with a space or a comma).
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="col-md-3" />
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter Characters"
                    name="word"
                    value={word}
                    onChange={this.onChange}
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
              {showWords && !errors.error ? (
                <div>
                  <hr className="mt-4" />
                  {words && !loading ? (
                    <div>
                      {words.length > 0 ? (
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
                      ) : (
                        <div className="container text-danger">
                          You can't create words with the given characters!
                        </div>
                      )}
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </div>
              ) : (
                <div className="container text-danger mt-4">{errors.error}</div>
              )}
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
            {chuck ? <h1 className="h4">"{chuck.value.joke}"</h1> : <Spinner />}
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
  { getWordnik, getChuck, getQuote, getWords }
)(Dashboard);

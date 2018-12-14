import React, { Component } from "react";
//import logo from "./logo.svg";

//css
import "./App.css";

// pages
import Saved from "./pages/saved"
import Search from "./pages/search"

// dependency components
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import io from "socket.io-client";

// utils
import API from "./utils/API";

// project omponents
import NavBar from "./components/NavBar/";
import Logo from "./components/Logo/";



class App extends Component {
  state = {
    searchInput: "",
    searchResults: [],
    saved: [],
    bookAdded: ""
  }

  socket = io()

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.search(this.state.searchInput).then(res => {
      const results = res.data.items;
      const newSearchResults = [];
      for (let i = 0; i < 20 && i < results.length; i++) {
        let ApiVolume = results[i].volumeInfo;
        let stateBook = {
          title: ApiVolume.title,
          link: ApiVolume.previewLink,
          summary: ApiVolume.description
        }
        if (ApiVolume.authors) {
          stateBook.authors = ApiVolume.authors.join(", ")
        } else {
          stateBook.authors = ["Anonymous"];
        }
        if (ApiVolume.imageLinks && ApiVolume.imageLinks.thumbnail) {
          stateBook.image = ApiVolume.imageLinks.thumbnail;
        } else {
          stateBook.image = "https://via.placeholder.com/200x300";
        }
        newSearchResults.push(stateBook);
      }
      this.setState({
        searchResults: newSearchResults
      });
    }).catch(err => console.log(err));
  }

  handleBookSave = bookData => {
    // check if this book is in state.saved
    let alreadySaved = false;
    this.state.saved.forEach(savedBook => {
      if (savedBook.title === bookData.title) alreadySaved = true;
    });
    // call saveBook method from API passing body
    if (alreadySaved === false) {
      API.saveBook(bookData)
        .then(res => {
          console.log(res);
          this.socket.emit("book saved", bookData.title);
          this.loadSavedBooks();
        })
        .catch(err => console.log(err))
    }
  }

  handleBookDelete = id => API.deleteBook(id)
    .then(res => this.loadSavedBooks())
    .catch(err => console.log(err))

  loadSavedBooks = () => {
    API.loadSavedBooks()
      .then(res => this.setState({
        saved: res.data
      })).catch(err => console.log(err));
  }

  componentDidMount = () => {
    this.loadSavedBooks();
    this.socket.on("book saved", (book) => {
      window.Materialize.toast(`${book} Saved!`, 3 * 1000)
    });
  };

  render() {
    return (
      <Router>
        <div>
          <NavBar bookAdded={this.state.bookAdded} />
          <Logo />
          <Switch>
            <Route exact path="/saved" component={() => <Saved
              bookAction={this.handleBookDelete}
              books={this.state.saved}
            />} />
            <Route exact path="/search" render={props => (
              <Search
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                bookAction={this.handleBookSave}
                books={this.state.searchResults}
                {...props} />
            )} />
            <Redirect from="/" to="/search" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
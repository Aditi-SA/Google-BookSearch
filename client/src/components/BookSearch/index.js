import React, { Component } from "react";
import { Card, Input, Button } from "react-materialize";

import "./BookSearch.css";

class BookSearch extends Component {
    render() {
        return (
            <Card id="search">
                <h5 id="searchTitle">Book Search</h5>
                <Input placeholder="Title" name="searchInput" onChange={this.props.handleInputChange} />
                <Button id="searchButton" waves="light" onClick={this.props.handleFormSubmit}>Search</Button>
            </Card>
        );
    }
}

export default BookSearch;
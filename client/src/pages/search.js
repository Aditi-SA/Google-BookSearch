import React from "react";
import BookSearch from "../components/BookSearch/";
import BookLog from "../components/BookLog/"

const Search = props => {
    return (
        <div>
            <BookSearch
                handleInputChange={props.handleInputChange}
                handleFormSubmit={props.handleFormSubmit}
            />
            {props.books.length > 0 && <BookLog
                title="Results"
                books={props.books}
                bookAction={props.bookAction}
            />}
        </div>
    )
}

export default Search;
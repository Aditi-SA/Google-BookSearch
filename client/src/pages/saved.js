import React from "react"
import BookLog from "../components/BookLog/"

const Saved = props => {
    console.log(props.books);
    return (
    <div>
        {props.books.length > 0 ? <BookLog
            title="Saved"
            books={props.books}
            bookAction={props.bookAction}
        /> : <p>Go to 'Search' to Save some Books</p>}
    </div>
)}

export default Saved;
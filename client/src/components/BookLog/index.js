import React from "react";
import { Card, Collection, CollectionItem, Button } from "react-materialize";

import "./BookLog.css";

const BookLog = props => {
    console.log(props.bookAction);
    return (
    <Card>
        <h4>{props.title}</h4>
        <Collection id="entryWrapper">
            {props.books.map(book => {
                return (
                <CollectionItem key={book.title}>
                    <div className="logTop">
                        <div>
                            <h5>{book.title}</h5>
                            <h6>Written by {book.authors}</h6>
                        </div>
                        <div className="logButtons">
                            <Button href={book.link} node="a" className="viewBtn">View</Button>
                            <Button
                                id={book._id || null}
                                onClick={() => {
                                    const param = props.title === "Results" ? book : book._id;
                                    props.bookAction(param);
                                    }}>
                                {props.title === "Results" ? "Save" : "Delete"}
                            </Button>
                        </div>
                    </div>
                    <div className="summary">
                        <img src={book.image} className="bookImg" alt={book.title} />
                        <p>{book.summary ? book.summary : "No summary available for this book."}</p>
                    </div>
                </CollectionItem>
            )})}
        </Collection>
    </Card>
)}

export default BookLog;
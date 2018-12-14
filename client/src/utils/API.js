import axios from "axios";
const BASEURL= "https://www.googleapis.com/books/v1/volumes?q=";

export default {
    search: query => axios.get(BASEURL + query.replace(/ /g, "+")),
    loadSavedBooks: () => axios.get("/api/books"),
    saveBook: bookData => axios.post("/api/books", bookData),
    deleteBook: id => axios.delete(`/api/books/${id}`)
};
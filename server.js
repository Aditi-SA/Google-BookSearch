const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const routes = require("./routes");
const io = require("socket.io")(http);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes)

io.on("connection", socket => {
  console.log("A user connected");
  socket.on("book saved", book => {
    console.log(book);
    io.emit("book saved", book);
  });
  socket.on("disconnect", () => console.log("A user disconnected"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")

http.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
/*
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
*/
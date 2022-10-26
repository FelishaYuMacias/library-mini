const express = require("express");
const router = express.Router();
const fs = require("fs");
const booksArr = require("../db/books.json")

// GET to , sends back an array of books
router.get("/api/books", (req, res) => {
    console.log("hello");
    fs.readFile("./db/books.json", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

  router.post("api/books", (req, res) => {
    console.log(req.body);
    fs.readFile("./db/books.json", "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const booksArr = JSON.parse(data);
        booksArr.push(req.body);
        console.log(booksArr);
        fs.writeFile(
          "./db/books.json",
          JSON.stringify(booksArr,null,4),
          (err, data) => {
            if (err) {
              throw err;
            }
            res.send("book added!");
          }
        );
      }
    });
  });
  
  // GET to /1, grabs that book by ID
  router.get("/api/books/:booksId", (req, res) => {
    for (let i = 0; i < booksArr.length; i++) {
      const thisBook = booksArr[i];
      if (thisBook.id == req.params.booksId) {
        return res.json(thisBook);
      }
    }
    return res.status(404).send("no such book!");
  });

module.exports = router;
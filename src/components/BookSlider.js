import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import Modal from "./Modal";
import axios from "axios";

const Book = () => {
  const [search, setSearch] = useState("all");
  const [books, setData] = useState([]);
  const [bookItem, setItem] = useState(null);
  const [show, setShow] = useState(false);

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&filter=free-ebooks&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=40`
      );
      setData(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Fetch books from the API
    const fetchData = async () => {
      await handleSearch();
    };

    fetchData();
  }, [handleSearch, search]);

  return (
    <>
      <div>
        <header className="header">
          <div className="row1">
            <h1>Free eBooks</h1>
          </div>

          <form
            className="row2"
            onSubmit={(e) => {
              e.preventDefault();
              // Trigger the search when the form is submitted
              handleSearch({ key: "Enter" });
            }}
          >
            <input
              type="text"
              placeholder="Press Enter to search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" onClick={handleKeyDown}>
              Search
            </button>
          </form>
        </header>
      </div>

      <div className="book-horizontal-list">
        {books.map((book) => (
          <div
            className="card"
            key={book.id}
            onClick={() => {
              setShow(true);
              setItem(book);
            }}
          >
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          </div>
        ))}
        <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
      </div>
    </>
  );
};

const BookSlider = () => {
  return (
    <>
      <Book />
    </>
  );
};

export default BookSlider;

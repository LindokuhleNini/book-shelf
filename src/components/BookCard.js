import React, { useState, useEffect } from "react";
import "./style.css";
import Modal from "./Modal";

const categories = [
  "comedy",
  "romance",
  "science",
  "history",
  "horror",
  "dystopian",
  "poetry",
  "thriller",
  "fantasy",
  "mystery",
  "biography",
  "crime-fiction",
  "classics",
  "fairy-tale",
  "cookbooks",
]; // Add more categories as needed

const Card = () => {
  const [selectedCategory, setSelectedCategory] = useState("comedy");
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=30&filter=free-ebooks&key=AIzaSyCREADg-u-1qnHRdnWjy9APA3lSNnZWrTU`
      );
      const data = await response.json();
      setBooks(data.items || []);
      setSelectedCategory(category);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleCategoryClick(selectedCategory);
    };

    fetchData();

    // Cleanup function to avoid unnecessary dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        className="horizontal-list"
        style={{ backgroundColor: "#10584d", padding: "10px", width: "100%" }}
      >
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            display: "flex",
          }}
        >
          {categories.map((category) => (
            <li style={{ marginRight: "15px" }} key={category}>
              <a
                href="#services"
                style={{
                  textDecoration: "none",
                  color: selectedCategory === category ? "yellow" : "white",
                }}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {selectedCategory && (
        <div className="main-body">
          {books.map((book) => (
            <div
              className="book-card"
              key={book.id}
              onClick={() => {
                setShow(true);
                setItem(book);
              }}
            >
              <img
                className="card-image"
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
              <div className="card-content">
                <h3 className="subheading">
                  {book.volumeInfo.authors &&
                    book.volumeInfo.authors.join(", ")}
                </h3>
                <h2 className="book-heading">{book.volumeInfo.title}</h2>
                <p>Category: {selectedCategory}</p>
              </div>
            </div>
          ))}
          <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
        </div>
      )}
      <div className="book-card"></div>
    </div>
  );
};

const BookCard = () => {
  return (
    <>
      <div className="card">
        <Card />
      </div>
    </>
  );
};

export default BookCard;

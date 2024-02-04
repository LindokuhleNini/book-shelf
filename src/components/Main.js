import React from "react";
import "./style.css";
import BookSlider from "./BookSlider";
import BookCard from "./BookCard";

const Main = () => {
  return (
    <>
      <div className="mainDiv">
        <BookSlider />
        <BookCard />
      </div>
    </>
  );
};

export default Main;

import React, { Component } from "react"
import "./carouselStyle.css"
import bookInfo from "../../book.json"
import BookCard from "./BookCard/BookCard"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class Carousel extends Component {
  getCategoryBook = () => {
    const backgroundColors = [
      { backgroundColor: "#f1c40f" },
      { backgroundColor: "#e67e22" },
      { backgroundColor: "#e74c3c" },
      { backgroundColor: "#badc58" },
      { backgroundColor: "#95a5a6" },
      { backgroundColor: "#34495e" },
      { backgroundColor: "#9b59b6" },
      { backgroundColor: "#3498db" },
      { backgroundColor: "#2ecc71" },
      { backgroundColor: "#1abc9c" }
    ]
    const darkColors = [
      { color: "#f39c12" },
      { color: "#d35400" },
      { color: "#c0392b" },
      { color: "#6ab04c" },
      { color: "#7f8c8d" },
      { color: "#2c3e50" },
      { color: "#8e44ad" },
      { color: "#2980b9" },
      { color: "#27ae60" },
      { color: "#16a085" }
    ]

    let carouselBooks = []
    // const textColor = "color: #FFFFFF;"
    for (let i = 0; i < bookInfo.store.length; i++) {
      const color = backgroundColors[i]
      const dark = darkColors[i]
      carouselBooks.push(
        <div key={i}>
          <BookCard
            bookInfo={bookInfo.store[i].books[0]}
            style={color}
            dark={dark}
          />
        </div>
      )
    }
    return carouselBooks
  }

  render() {
    var settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "30px",
      slidesToShow: 2.72,
      speed: 500
    }
    return (
      <div className="Carousel">
        <Slider {...settings}>{this.getCategoryBook()}</Slider>
      </div>
    )
  }
}

export default Carousel

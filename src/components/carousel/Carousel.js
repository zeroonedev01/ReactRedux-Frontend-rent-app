import React, { Component } from "react"
import "./carouselStyle.css"
// import bookInfo from "../../book.json"
import BookCard from "./BookCard/BookCard"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Axios from "axios"

const API_URL = "http://afternoon-coast-91761.herokuapp.com/rentapp/"
// const Carousel = props => {
//   return (
//     <div>
//       {props.carousel.map((book, i) => {
//         return <Typography>{book.Title}</Typography>
//       })}
//     </div>
//   )
// }

class Carousel extends Component {
  state = {
    getCarousel: []
  }
  componentDidMount = () => {
    const url = `${API_URL}/books?available=true&page=1&limit=10`
    Axios.get(url)
      .then(res => {
        this.setState({
          getCarousel: res.data.values
        })
        console.log("getCarousel =", this.state.getCarousel)
      })
      .catch(err => console.log("error =", err))
  }
  getCategoryBook = () => {
    const backgroundColors = [
      { backgroundColor: "#f1c40f" },
      { backgroundColor: "#e67e22" },
      { backgroundColor: "#e74c3c" },
      { backgroundColor: "#95a5a6" },
      { backgroundColor: "#badc58" },
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
      { color: "#7f8c8d" },
      { color: "#6ab04c" },
      { color: "#2c3e50" },
      { color: "#8e44ad" },
      { color: "#2980b9" },
      { color: "#27ae60" },
      { color: "#16a085" }
    ]
    // console.log(this.state.getCarousel[0])
    let carouselBooks = []
    // const textColor = "color: #FFFFFF;"
    for (let i = 0; i < this.props.carousel.length; i++) {
      const color = backgroundColors[i]
      const dark = darkColors[i]
      carouselBooks.push(
        <div key={i}>
          <BookCard
            bookInfo={this.props.carousel[i]}
            style={color}
            dark={dark}
          />
        </div>
      )
    }
    return carouselBooks
  }

  render() {
    let settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "30px",
      slidesToShow: 2.72,
      speed: 500,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    }
    // console.log(this.props.carousel.Title)
    return (
      <div className="Carousel">
        {/* {this.props.carousel.map((book, i) => {
          return <Typography>{book.Title}</Typography>
        })} */}

        <Slider {...settings}>{this.getCategoryBook()}</Slider>
      </div>
    )
  }
}

export default Carousel

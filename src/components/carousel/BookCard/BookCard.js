import React, { Component } from "react"
import "../carouselStyle.css"
import Cover from "./Cover"
import Info from "./Info"

class BookCard extends Component {
  render() {
    return (
      <div className="BookCard" style={this.props.style}>
        <Cover img={this.props.bookInfo.Image} />
        <Info
          idb={this.props.bookInfo.id}
          titel={this.props.bookInfo.Title}
          genre={this.props.bookInfo.genre}
          date={this.props.bookInfo.DateReleased}
          status={this.props.bookInfo.available}
          color={this.props.dark}
        />
      </div>
    )
  }
}

export default BookCard

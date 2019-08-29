import React, { Component } from "react"
import "../carouselStyle.css"

class BookCover extends Component {
  render() {
    return (
      <div className="Cover">
        <img src={this.props.img} alt="sds" />
      </div>
    )
  }
}

export default BookCover

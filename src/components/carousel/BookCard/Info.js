import React, { Component } from "react"
import "../carouselStyle.css"
import SeeBook from "./SeeBook"
import { Link } from "react-router-dom"

class BookInfo extends Component {
  render() {
    // const textColor = "#FFFFFF"
    return (
      <div className="Info">
        <h1>{this.props.titel}</h1>
        <p className="Author">
          Genre : {this.props.genre}
          <br />
          Date : {this.props.date}
          <br />
          Available : {this.props.status}
        </p>
        <Link to={`/book/${this.props.idb}`} style={{ textDecoration: "none" }}>
          <SeeBook color={this.props.color} />
        </Link>
      </div>
    )
  }
}

export default BookInfo

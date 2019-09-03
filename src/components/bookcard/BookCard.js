import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import Axios from "axios"
import "../style.css"
const maxlength = 150
const API_URL = "http://localhost:3020/rentapp/"
class BookCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getAPI: []
    }
  }

  componentDidMount = () => {
    const url = `${API_URL}/books/`
    Axios.get(url)
      .then(res => {
        this.setState({ getAPI: res.data.values })
        console.log("getAPI =", this.state.getAPI)
      })
      .catch(err => console.log("error =", err))
  }
  render() {
    const { getAPI } = this.state
    return (
      <Container className="cardGrid" maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          style={{ paddingBottom: "20px" }}
        >
          List Books
        </Typography>

        <Grid container spacing={4} className="Space">
          {getAPI.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Link
                to={`/book/${card.id}`}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Card className="card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={card.Title}
                      height="250"
                      image={card.Image}
                      title={card.Title}
                    />
                    <CardContent className="cardContent">
                      <Typography gutterBottom variant="h6" component="h5">
                        {card.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {card.Description.length > maxlength
                          ? card.Description.substring(0, maxlength) + "....."
                          : card.Description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
  // const classes = useStyles()
}
export default BookCard

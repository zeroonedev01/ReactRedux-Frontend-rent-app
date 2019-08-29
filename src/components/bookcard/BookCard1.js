import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import Divider from "@material-ui/core/Divider"
import Chip from "@material-ui/core/Chip"
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  divider: {
    margin: "0 0 12px 0"
  },
  chip: {
    marginRight: "8px"
  }
})

const BookCard1 = props => {
  const classes = useStyles()
  const {
    id,
    Title,
    Description,
    Image,
    genre,
    available,
    DateReleased
  } = props.info

  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Link
        to={{ pathname: `/book/${id}`, state: props.info }}
        style={{ textDecoration: "none" }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="280"
              image={Image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {Title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="justify"
              >
                {Description.length > 150
                  ? Description.substring(0, 150) + "....."
                  : Description}
              </Typography>
              <Typography
                variant="body2"
                style={{ marginTop: "10px" }}
                color="textSecondary"
                component="p"
              >
                Date Relesed : {DateReleased}
              </Typography>
              <Divider className={classes.divider} />
              <Chip
                className={classes.chip}
                label={genre}
                style={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "#ffffff"
                }}
              />
              {available === "true" ? (
                <Chip
                  className={classes.chip}
                  label="Available"
                  style={{
                    background:
                      "linear-gradient(45deg, #43e97b 30%, #38f914 70%)",
                    color: "#ffffff"
                  }}
                />
              ) : (
                <Chip
                  className={classes.chip}
                  label="Not Available"
                  style={{
                    background: "linear-gradient(to right, #616161, #9bc5c3)",
                    color: "#ffffff"
                  }}
                />
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  )
}
export default BookCard1

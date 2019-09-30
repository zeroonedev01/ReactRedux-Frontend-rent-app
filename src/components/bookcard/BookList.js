import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import BookCard from "./BookCard1"

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

const BookList = props => {
  const classes = useStyles()
  let startItemOfPage = 9 * props.i
  console.log("Start", startItemOfPage)
  let endItemOfPage = 9 * (props.i + 1)
  console.log("end", endItemOfPage)
  return (
    <div>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h1"
            variant="h4"
            style={{ paddingBottom: "20px" }}
          >
            List Books
          </Typography>
          <Grid container spacing={4}>
            {props.books
              .slice(startItemOfPage, endItemOfPage)
              .map((book, i) => {
                return <BookCard key={i} info={book} />
              })}
          </Grid>
          <Grid
            container
            spacing={2}
            justify="center"
            style={{ marginTop: "10px" }}
          >
            {props.i > 0 && (
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => props.handlePage(props.i - 1)}
                  // onClick={props.handlePage(props.i - 1)}
                  color="secondary"
                >
                  previus
                </Button>
              </Grid>
            )}
            {props.i * 9 + 1 < props.books.length && (
              <Grid item>
                <Button
                  onClick={() => props.handlePage(props.i + 1)}
                  // () => this.setState({ i: props.i + 1 })
                  // onClick={props.handlePage(props.i + 1)}
                  variant="outlined"
                  color="secondary"
                >
                  Next
                </Button>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  )
}
export default BookList

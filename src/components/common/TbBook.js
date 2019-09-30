import React from "react"
import MUIDataTable from "mui-datatables"
import { Button } from "@material-ui/core"
import swal from "sweetalert"
import check from "../../helpers/jwt"
import { confirmBorID } from "../../Publics/actions/borrow"
import { connect } from "react-redux"

const Manage = props => {
  const columns = [
    "Transaction ID",
    "Title",
    "Book ID",
    "Borrow Date",
    "Expired Date",
    "Action"
  ]
  // const data = Array.from(this.props.data)
  // const data = this.props.data
  const handleBorrowOne = async e => {
    const token = JSON.parse(check.getToken())
    console.log(token)
    await props
      .dispatch(confirmBorID(e, token))
      .then(res => {
        console.log("add Book", res.action.payload.data.status)
        if (res.action.payload.data.status === 410) {
          swal({
            title: "Warning!",
            text: `${res.action.payload.data.message}`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else if (res.action.payload.data.status === 500) {
          swal({
            title: "Warning!",
            text: `Fail to Authentication. Error`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else if (res.action.payload.data.status === 404) {
          swal({
            title: "Warning!",
            text: `${res.action.payload.data.message}`,
            icon: "warning",
            timer: 2000,
            button: false
          })
        } else {
          swal({
            title: "Done!",
            text: "Borrow Accepted",
            icon: "success",
            timer: 2000,
            button: false
          })
        }
      })
      .catch(err => {
        swal({
          title: "Failed!",
          text: "Add Book Failed!" + err,
          icon: "warning",
          buttons: "oke"
        })
      })
  }
  const handleReturnOne = e => {}
  const data = props.data
    // .filter(item => item.status === 1)
    .map((item, index) => {
      return [
        item.id,
        item.title,
        item.bookid,
        (item.daterent = new Date(item.daterent).toISOString().split("T")[0]),
        (item.datereturn = new Date(item.datereturn)
          .toISOString()
          .split("T")[0]),
        item.req_name === "return" ? (
          <Button
            onClick={() => handleReturnOne(item.id)}
            size="small"
            variant="contained"
            color="secondary"
          >
            {" "}
            Confirm Return
          </Button>
        ) : (
          <Button
            onClick={() => handleBorrowOne(item.id)}
            size="small"
            variant="contained"
            color="secondary"
            disabled={false}
          >
            {console.log("stat")}
            Confirm Borrow
          </Button>
        )
      ]
    })
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked"
  }

  return (
    <MUIDataTable
      title={"Manage Request"}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

const mapStateToProps = state => {
  return {
    borrow: state.borrow
  }
}
export default connect(mapStateToProps)(Manage)

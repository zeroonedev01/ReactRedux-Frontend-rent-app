import React from "react"
import MUIDataTable from "mui-datatables"
import { Typography } from "@material-ui/core"

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
      // fine: 0
    }
    this.fine1 = 0
  }
  componentDidMount = () => {
    this.setState({ data: this.props.data })
  }
  handleClick = e => {
    window.location.href = `/book/${e}`
  }
  fineMoney = e => {
    const date2 = new Date()
    const diffDays = Math.ceil(
      Math.abs(date2.getTime() - e.getTime()) / (1000 * 60 * 60 * 24)
    )
    const fine = diffDays * 2000
    if (date2 > e) {
      // console.log((this.fine1 += fine))
      this.fine1 += fine
      return fine
    } else {
      return 0
    }
  }
  render() {
    console.log("sayank", this.state.data)
    // console.log(this.fine1)

    const columns = [
      "Transaction ID",
      "Title",
      "Borrow Date",
      "Expired Date",
      "Fine to Day",
      "Date Returned"
    ]
    let date = new Date()
    date.setDate(date.getDate() - 1)
    console.log(date)
    const data = this.props.data
      .filter(
        item =>
          new Date(item.datereturnuser).toISOString().split("T")[0] ===
          date.toISOString().split("T")[0]
      )
      .map((item, index) => {
        console.log("sdsds")
        return [
          item.id,
          item.title,
          (item.daterent = new Date(item.daterent).toISOString().split("T")[0]),
          (item.datereturn = new Date(item.datereturn)
            .toISOString()
            .split("T")[0]),
          (item.datereturnuser = new Date(item.datereturnuser)
            .toISOString()
            .split("T")[0]),
          this.fineMoney(new Date(item.datereturn))
        ]
      })
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      customFooter: () => {
        return <Typography align="right">Total Fine {this.fine1}</Typography>
      }
    }
    console.log("aaat", this.fine1)
    return (
      <>
        <MUIDataTable
          title={"On Borrowing"}
          data={data}
          columns={columns}
          options={options}
        />
      </>
    )
  }
}
export default History

import React from "react"
import MUIDataTable from "mui-datatables"
import { Button } from "@material-ui/core"

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount = () => {
    this.setState({ data: this.props.data })
  }
  render() {
    console.log("sayank", this.state.data)
    const columns = [
      "Transaction ID",
      "Title",
      "Borrow Date",
      "Expired Date",
      "Returned Date"
    ]
    // const data = Array.from(this.props.data)
    // const data = this.props.data
    const data = this.props.data
      .filter(item => item.status === 1)
      .map((item, index) => {
        return [
          item.id,
          item.title,
          (item.daterent = new Date(item.daterent).toISOString().split("T")[0]),
          (item.datereturn = new Date(item.datereturn)
            .toISOString()
            .split("T")[0]),
          (item.datereturnuser = new Date(item.datereturnuser)
            .toISOString()
            .split("T")[0])
        ]
      })
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none"
    }

    return (
      <MUIDataTable
        title={"HISTORY BORROWING"}
        data={data}
        columns={columns}
        options={options}
      />
    )
  }
}
export default History

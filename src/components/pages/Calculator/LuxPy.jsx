import React from "react";
import Button from "react-bootstrap/es/Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "pnnl-react-core/lib/Loader";

class LuxPy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example_number: "",
      loading: false,
      data: [],
      tableReady: false,
      disabled: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    if (this.state.example_number !== "") {
      //console.log(this.example_number);
      event.preventDefault();
      this.setState({ loading: true }, () => {
        axios.defaults.headers.common = {};
        axios.defaults.headers.common.accept = "application/json";
        axios
          .post("http://localhost:5000/api/runExample", {
            info: `${this.state.example_number}`
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            //console.log(data.data);
            this.setState({
              loading: false,
              data: data.data,
              tableReady: true
            });
            //console.log("TableReady: " + this.state.tableReady);
            console.log(this.state.data);
            /*
            this.props.history.push({
              pathname: "/Report",
              state: {
                data: this.state.data
              }
            });
            */
          });
      });
    }
  }
  handleChange(event) {
    if (event.target.value === "") {
      this.setState({ example_number: event.target.value, disabled: true });
    } else {
      this.setState({ example_number: event.target.value, disabled: false });
    }
  }
  render() {
    const loading = this.state.loading;
    let examples = ["1 CIE F1", "2 CIE F2", "3 CIE F3", "4 CIE F4", "5 CIE F5"];
    let optionItems = examples.map(example => (
      <option key={example} value={example}>
        {example}
      </option>
    ));

    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.example_number} onChange={this.handleChange}>
          <option value="">Choose an Example</option>
          {optionItems}
        </select>
        <br />
        {loading ? (
          <div>
            <label>
              {" "}
              Calculating Results <br />{" "}
              <LoadingSpinner color="copper" size={6} />{" "}
            </label>
          </div>
        ) : (
          [
            this.state.tableReady ? (
              <p>
                <label>Done!</label>
              </p>
            ) : (
              <label></label>
            ),
            <Button bsSize="sm" type="submit" disabled={this.state.disabled}>
              Calculate
            </Button>
          ]
        )}
      </form>
    );
  }
}

export default withRouter(LuxPy);

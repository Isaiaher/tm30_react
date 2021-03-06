/**
 * Hue-Angle Bin Average Coordinates
 *
 * A component for the Hue-Angle Bin Average Coordinates. This graph is
 * similar to the CVG plot, but it uses the Hue-Bin average numbers, (The average (a', b') coordinates of CAM02-UCS )
 * thus the ploygons are not as round and more jagged. It also does not have
 * the reference circles and the extra information displayed on the plot.
 *
 *
 * @author Isaiah Scheel.
 * @since  11.07.2019
 */
/**
 * Imports
 */
import React, { Component } from "react";
import Plot from "react-plotly.js";
/**
 * HBAPlot Class
 */
export class HBAPlot extends Component {
  /**
   * Constructor to initialize variables with props data
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.a_prime_test_j = this.props.a_prime_test_j;
    this.a_prime_test_j.push(this.a_prime_test_j[0]); //Connect the polygon completely
    this.b_prime_test_j = this.props.b_prime_test_j;
    this.b_prime_test_j.push(this.b_prime_test_j[0]); //Connect the polygon completely

    this.a_prime_ref_j = this.props.a_prime_ref_j;
    this.a_prime_ref_j.push(this.a_prime_ref_j[0]); //Connect the polygon completely
    this.b_prime_ref_j = this.props.b_prime_ref_j;
    this.b_prime_ref_j.push(this.b_prime_ref_j[0]); //Connect the polygon completely

    var theta;
    var i;

    /**
     * Creating the Bin Numbers
     */
    this.bin_numbers = [];
    theta = 11.5;
    for (i = 1; i <= 16; i++) {
      var x = 35 * Math.cos((theta * Math.PI) / 180);
      var y = 35 * Math.sin((theta * Math.PI) / 180);
      theta += 22.5;
      this.bin_numbers[i - 1] = {
        x: x,
        y: y,
        xref: "x",
        yref: "y",
        text: `${i}`,
        font: {
          size: 12,
          color: "black"
        },
        ax: 0,
        ay: 0
      };
    }

    /**
     * Creating Bin lines
     * Important - these are different than the CVG lines
     * because this graph's scale is much larger so the lines extend
     * much further.
     */
    this.bin_lines = [
      {
        x: [-60, 60],
        y: [0, 0],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [-55.43, 55.43],
        y: [-22.96, 22.96],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [-42.43, 42.43],
        y: [-42.43, 42.43],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [-22.96, 22.96],
        y: [-55.43, 55.43],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [0, 0],
        y: [-60.0, 60.0],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [55.43, -55.43],
        y: [-22.96, 22.96],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [22.96, -22.96],
        y: [-55.43, 55.43],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      },
      {
        x: [42.43, -42.43],
        y: [-42.43, 42.43],
        mode: "lines",
        name: "Solid",
        line: {
          dash: "5px",
          width: 1
        },
        marker: { color: "grey" },
        showlegend: false,
        hoverinfo: "skip"
      }
    ];
  }
  /**
   * Render method for HBAPlot
   */
  render() {
    return (
      <div style={{ position: "inherit", display: "inline-block" }}>
        <Plot
          data={[
            ...this.bin_lines,
            {
              name: "Test",
              x: this.a_prime_test_j,
              y: this.b_prime_test_j,
              type: "scatter",
              mode: "lines+markers",
              connectgaps: true,
              marker: { symbol: "square", color: "red" }
            },
            {
              name: "Reference",
              x: this.a_prime_ref_j,
              y: this.b_prime_ref_j,
              type: "scatter",
              mode: "lines+markers",
              connectgaps: true,
              marker: { symbol: "square", color: "black" }
            }
          ]}
          layout={{
            showlegend: false,
            width: 400,
            height: 400,
            margin: {
              l: 50,
              r: 40,
              b: 55,
              t: 30,
              pad: 4
            },

            xaxis: {
              showgrid: false,
              showline: true,
              zeroline: false,
              ticks: "outside",
              showticklabels: true,
              title: {
                text: "a'"
              },
              range: [-40, 40]
            },
            yaxis: {
              ticks: "outside",
              zeroline: false,
              showgrid: false,
              showline: true,
              showticklabels: true,
              title: {
                text: "b'"
              },
              range: [-40, 40]
            },
            images: [
              {
                source: "https://i.imgur.com/QkpOGSJ.png",
                xref: "x",
                yref: "y",
                x: -40,
                y: 40,
                sizex: 80,
                sizey: 80,
                sizing: "stretch",
                layer: "below"
              }
            ],
            annotations: [...this.bin_numbers]
          }}
          config={{ displayModeBar: false }}
        />
        <div align="center">
          <h5>Hue-Angle Bin Average Coordinates</h5>
          The average (a', b') coordinates of CAM02-UCS are calculated for the{" "}
          <br />
          CES within each of 16 hue-angle bins. Rg is based on the area of the{" "}
          <br />
          polygons for the test and reference conditions. The three types of{" "}
          <br />
          "Local" values are based on the difference in coordinates for each{" "}
          <br />
          hue-angle bin. [Background is for visual orientation only]
        </div>
      </div>
    );
  }
}

export default HBAPlot;

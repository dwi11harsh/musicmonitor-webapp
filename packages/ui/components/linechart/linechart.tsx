import * as React from "react";
import * as d3 from "d3";
import { useRecoilValue } from "recoil";
import { getChartDataState, Data } from "../../index";

interface Line {
  name: string;
  values: Data[];
}

function LineChartComponent(
  svgRef: React.RefObject<SVGSVGElement>,
  chartData: Data[]
) {
  // console.log("chart Data: ", chartData);
  const parseDate = d3.timeParse("%Y-%m-%d");
  // console.log(
  //   "Parsed chart data:",
  //   chartData.map((item) => ({ ...item, date: parseDate(item.date) }))
  // );

  const data = [
    {
      name: "dummy",
      values: chartData.map((line) => {
        const date = parseDate(line.date);

        return {
          date: date,
          value: +line.value,
        };
      }),
    },
  ];

  const svg = d3.select(svgRef.current);
  const width = 450;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const duration = 250;

  const lineOpacity = "1";
  const lineOpacityHover = "0.85";
  const lineStroke = "3.5";
  const lineStrokeHover = "5";

  const circleOpacity = "0.85";
  const circleOpacityOnLineHover = "0.85";
  const circleRadius = 5;
  const circleRadiusHover = 6;

  /* Scale */
  const [minX, maxX] = d3.extent(data[0].values, (d) => d.date);
  const xScale = d3
    .scaleTime()
    .domain([minX!, maxX!])
    .range([margin.left, width - margin.right]);

  const [minY, maxY] = d3.extent(data[0].values, (d) => d.value);
  const yScale = d3
    .scaleLinear()
    .domain([minY!, maxY!])
    .range([height - margin.bottom, margin.top]);

  /* Add SVG */
  svg
    .attr("width", width + "px")
    .attr("height", height + "px")
    .append("g");

  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%m/%d"))
    .tickSizeOuter(0)
    .tickPadding(10);

  const yAxis = d3.axisLeft(yScale).tickSizeOuter(0).tickPadding(20);

  // Add the X Axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(xAxis);

  // Add the Y Axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(yAxis);

  /* Add line into SVG */
  const line = d3
    .line<Data>()
    .x((d) => xScale(new Date(d.date!)))
    .y((d) => yScale(d.value));

  const lines = svg.select("g");

  lines
    .selectAll("line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values as any))
    .style("stroke", "#33BBFF")
    .style("fill", "none")
    .style("opacity", lineOpacity)
    .on("mouseover", function () {
      d3.selectAll(".line").style("opacity", lineOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });

  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", "#33BBFF")
    .selectAll("circle")
    .data((d: any) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")
    .append("circle")
    .attr("cx", (d: any) => xScale(d.date!))
    .attr("cy", (d: any) => yScale(d.value))
    .attr("r", circleRadius)
    .style("opacity", circleOpacity)
    .on("mouseover", function (event, d: any) {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr("r", circleRadiusHover);

      // Displaying the value on hover
      const formatTime = d3.timeFormat("%b %d, %Y");
      const tooltip = svg
        .append("text")
        .attr("x", xScale(d.date!) + 10)
        .attr("y", yScale(d.value) - 10)
        .attr("class", "tooltip")
        .style("fill", "black")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(`(${d.value}, ${formatTime(d.date!)})`);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(duration).attr("r", circleRadius);

      // Removing the tooltip
      svg.select(".tooltip").remove();
    });
}

export const LineChart: React.FunctionComponent = () => {
  const chartArr: Data[] = useRecoilValue(getChartDataState);
  const svg = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    // Clear previous chart
    if (svg.current) {
      d3.select(svg.current).selectAll("*").remove();
    }

    const parsedArr = chartArr.map((item) => ({
      date: item.date,
      value: item.value,
    }));

    LineChartComponent(svg, parsedArr);
  }, [svg, chartArr]);

  return <svg ref={svg} />;
};

import { Scales } from './scales.js';
import { getDataByMonth } from './data_filter.js';
import { drawScatterPlot } from './scatter.js';
import { drawBarChart } from './bar.js'; 

const svg_scatter = d3.select('#scatterplot');
const svg_bar = d3.select('#barchart');
// const viewBox_scatter = svg_scatter.attr('viewBox').split(' ');
// const viewBox_bar = svg_bar.attr('viewBox').split(' ');
const viewBox = svg_scatter.attr('viewBox').split(' ');
let div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

let dataURL = "https://gist.githubusercontent.com/hogwild/7e61222f328aea78daa1cab45defe406/raw/824dd8d6edccb2b60b1792b84bc8d12c0c424bc3/citibike_2020.csv"
d3.csv(dataURL).then(function(data){
    data.forEach(d => {
        d.start_from = +d.start;
        d.end_in = +d.end;
        d.trip_duration_start_from = +d.tripdurationS;
        d.trip_duration_end_in = +d.tripdurationE;
    });
    //console.log(getDataByMonth(data, 'May'));
    
    const margin = { left: 50, right: 30, top: 30, bottom: 120 };

    const width_spl = viewBox[2] - margin.left - margin.right;
    const height_spl = viewBox[3] - margin.top - margin.bottom;

    const xScale_spl = Scales.linear(0, d3.max(data, d => d.trip_duration_start_from), 0, width_spl);
    const yScale_spl = Scales.linear(0, d3.max(data, d => d.trip_duration_end_in), height_spl, 0);
    const xAxis_spl = d3.axisBottom(xScale_spl).ticks(10);
    const yAxis_spl = d3.axisLeft(yScale_spl).ticks(5);

    const spl = svg_scatter.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    spl.append('g')
      .attr('transform', 'translate(0, ' + height_spl + ")")
      .attr('class', 'x-axis')
      .call(xAxis_spl);
    spl.append("g")
      .attr("transform", `translate(${width_spl-70}, ${height_spl-10})`)
      .append("text")
      .style("text-anchor", "middle")
      .text("Trip duration start from");
    
    spl.append('g')
      .attr('class', 'y-axis')
      .call(yAxis_spl);
    spl.append("g")
      .attr("transform", `translate(${20}, ${70})`)
      .append("text")
      .style("text-anchor", "middle")
      .text("Trip duration end in")
      .attr('transform',"rotate(-90)");

    drawScatterPlot(spl, getDataByMonth(data, 'May'), xScale_spl, yScale_spl, div, width_spl, height_spl);

    const width_bar = viewBox[2] - margin.left - margin.right;
    const height_bar = viewBox[3] - margin.top - margin.bottom;
    console.log(width_bar, height_bar);

    const xScale_bar = Scales.band(data.map(d => {return d.station}), 0, width_bar);
    const yScale_bar = Scales.linear(0, d3.max(data, d => d.start_from), height_bar, 0);
    const xAxis_bar = d3.axisBottom(xScale_bar); 
    const yAxis_bar = d3.axisLeft(yScale_bar).ticks(5);

    let barChart = svg_bar.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");

    barChart.append('g')
    .attr("transform", "translate(" +0+ "," + height_bar +")")
    .attr('class', 'x-axis')
    .call(xAxis_bar)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-0.8em')
    .attr('dy', '.015em')
    .attr('transform', 'rotate(-65)');

    barChart.append('g')
    .attr('class', 'y-axis')
    .call(yAxis_bar);
    barChart.append("g")
      .attr("transform", `translate(${40}, ${-5})`)
      .append("text")
      .style("text-anchor", "middle")
      .text("Bikers start from");
    
    drawBarChart(barChart, getDataByMonth(data, "May"), xScale_bar, yScale_bar, width_bar, height_bar, div);

    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let slider = d3.select('#slider');
    let slidertext = d3.select('#slidertext');
    
    slider.on("input", function(){
      console.log(this.value);
      slidertext.attr('value', month[this.value-1]);
      d3.selectAll('.point').remove();
      d3.selectAll('.bar').remove();
      draw(month[this.value-1]);
    });
    
    function draw(month) {
      drawBarChart(barChart, getDataByMonth(data, month), xScale_bar, yScale_bar, width_bar, height_bar, div);
      drawScatterPlot(spl, getDataByMonth(data, month), xScale_spl, yScale_spl, div, width_spl, height_spl);
    }
  });
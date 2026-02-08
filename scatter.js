export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, div, scatterPlotWidth, scatterPlotHeight) => {
  
  scatterPlotLayer.selectAll('.point')
      .data(data)
      .enter().append('circle')
      .attr('class', d=>`point ${d.station.replace(/[^a-zA-Z]/g, "")}`)
      .attr('cx', d => xScale(d.trip_duration_start_from))
      .attr('cy', d => yScale(d.trip_duration_end_in))
      .attr('r', "5")
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .lower()
      .on("mouseover", (event, d) => {
        div.style("opacity", .9);
        div.html(d.station)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
        d3.select("#coverRect").style("display", "block");
        d3.select(event.currentTarget).attr("r", 10).raise();
        let cl = d3.select(event.currentTarget).attr("class").substring(6);
        d3.selectAll("."+cl).style("fill", "red");
        console.log("selected point", cl);
      })
      .on('mouseout',(event, d)=>{
        console.log("mouse out");
        div.style("opacity", 0);
        d3.select("#coverRect").style("display", "none")
        d3.select(event.currentTarget).attr('r', 5).lower();
        let cl = d3.select(event.currentTarget).attr("class").substring(6);
        d3.selectAll("."+cl).style("fill", "steelblue");
      });

}

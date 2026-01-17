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
      .on("mouseover", (event, d) => {
        div.style("opacity", .9);
        div.html(d.station)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
        d3.select(event.target.parentElement)
          .append('rect')
          .attr('id', 'coverRect')
          .attr('x', '0')
          .attr('y', '0')
          .attr('width', `${scatterPlotWidth}`)
          .attr('height', `${scatterPlotHeight}`)
          .style('fill', '#fce703')
          .style('opacity', 0.5);
      d3.select(event.target).style("r", 10);

      let cl = d3.select(event.target).attr("class").substring(6);
      d3.selectAll("."+cl).style("fill", "red").raise();
      })
      .on('mouseout',(event, d)=>{
        div.style("opacity", 0);
        d3.select("#coverRect")
          .remove();
        d3.select(event.target).style('r', 5);
        let cl = d3.select(event.target).attr("class").substring(6);
        d3.selectAll("."+cl).style("fill", "steelblue").lower();
      });

}
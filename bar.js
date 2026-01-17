export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight, div) => {
  // xScale.domain()
  barChatLayer.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', d=>`bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)
      .attr('x', d => xScale(d.station))
      .attr('y', d => yScale(d.end_in))
      .attr('width', xScale.bandwidth())
      .attr('height', d => {return barChartHeight-yScale(d.end_in);})
      .style("fill", 'steelblue')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
        let cl = d3.select(event.target).attr("class").substring(4);
      d3.select(d3.select(".point."+cl).node().parentNode)
        .append('rect')
        .attr('id', 'coverRect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('width', `${barChartWidth}`)
        .attr('height', `${barChartHeight}`)
        .style('fill', '#fce703')
        .style('opacity', 0.9);
      d3.selectAll("."+cl).style("fill", "red").style("r", 10).raise();
      })
      .on('mouseout',(event, d)=>{
        div.style("opacity", 0);
        let cl = d3.select(event.target).attr("class").substring(4);
        d3.select("#coverRect").remove();
        d3.selectAll("."+cl).style("fill", "steelblue").style("r", 5);
      });
}
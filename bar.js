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
        // console.log(cl);
        d3.select("#coverRect").style("display", "block");
        d3.select(event.target).style("fill", "red");
        d3.selectAll(".point."+cl).style("fill", "red").attr("r", 10).raise();
      })
      .on('mouseout',(event, d)=>{
        div.style("opacity", 0);
        let cl = d3.select(event.target).attr("class").substring(4);
        d3.select("#coverRect").style("display", "none");
        d3.select(event.target).style("fill", "steelblue");
        d3.selectAll(".point."+cl).style("fill", "steelblue").attr("r", 5).lower();
      });
}
function responsive() {
    var svgsize = d3.select("#scatter").select("svg");
    if (!svgsize.empty()) {
      svgsize.remove();
    }
    
    var svgwidth = window.innerWidth;
    var svgheight = window.innerHeight;
    
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
   
    var height = svgheight - margin.top - margin.bottom;
    var width = svgwidth - margin.left - margin.right;
    
    var svg = d3.select("#scatter")
      .append("svg")
      .attr("height", svgheight)
      .attr("width", svgwidth);
    
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,
    // healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh

    d3.csv("assets/data/data.csv").then(function(data) {
        // Get the data into useful forms
        data.forEach(function(d) {
            d.poverty = +d.poverty;
            d.povertyMoe = +d.povertyMoe;
            d.age = +d.age;
            d.income = +d.income;
            d.incomeMoe = +d.incomeMoe;
            d.healthcare = +d.healthcare;
            d.healthcareLow = +d.healthcareLow;
            d.healthcareHigh = +d.healthcareHigh;
            d.obesity = +d.obesity;
            d.obesityLow = +d.obesityLow;
            d.obesityHigh = +d.obesityHigh;
            d.smokes = +d.smokes;
            d.smokesLow = +d.smokesLow;
            d.smokesHigh = +d.smokesHigh;
        });

    var xscale = d3.scaleLinear()
    .domain(d3.extent(data, j => j.poverty))
    .range([0, width]);

    var yscale = d3.scaleLinear()
    .domain(d3.extent(data, j => j.healthcare))
    .range([0, height]); 
    
    var xaxis = d3.axisBottom(xscale).ticks(7);
    var yaxis = d3.axisLeft(yscale).ticks(10);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xaxis);
    chartGroup.append("g")
    .call(yaxis);
   
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", j => xscale(j.poverty))
    .attr("cy", j => yscale(j.healthcare))
    .attr("r", "20")
    .attr("fill", "lightsteelblue")
    .attr("stroke", "black");

    var textgroup = chartGroup.selectAll("text")
    // .append("g")
    .data(data)
    .enter()
    .append("text")
    .text(function(j) {return j.abbr})
    .attr("x", j => xscale(j.poverty)-10)
    .attr("y", j => yscale(j.healthcare)+5);
    // .attr("x", function(j) {return xscale(j.poverty)})
    // .attr("y", function(j) {return yscale(j.healthcare)})
});
};
responsive();
d3.select(window).on("resize", responsive);

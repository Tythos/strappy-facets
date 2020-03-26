/* Reference implementations for forms are highly underdeveloped. We focus here
   on tabular layout of four basic input types: text; password; radio; and
   checkbox. Conceivable this could also be extended to include more
   complicated inputs like file uploads.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Figure.hbs");
    let Facet = require("Facet");
    let d3 = require("lib/d3-v4.2.6.min");

    class Figure extends Facet {
        constructor() {
            super(template);
            this.parameters.title = "";
            this.parameters.xLabel = "";
            this.parameters.yLabel = "";
            this.series = [];
        }

        data(series) {
            /* series input is an array of 2-element arrays (x and y values).
               In the future, this.series will be seperated into different
               formats (line, scatter, etc.).
            */
            this.series.push(series);
            return this;
        }

        render() {
            /*
            */
            this.subdom = this.template.render(this.parameters);
            this.svg = d3.select(this.subdom.querySelector("svg"));
            this.body = this.svg.append("g");
            this.margin = { top: 0.1, right: 0.0, bottom: 0.2, left: 0.1 };
            let w = parseInt(this.svg.attr("width"));
            if (!w) { w = 640; this.svg.attr("width", w + "px"); }
            let h = parseInt(this.svg.attr("height"));
            if (!h) { h = 480; this.svg.attr("height", h + "px"); }

            // compute scales
            let width = w * (1 - this.margin.left - this.margin.right);
            let height = h * (1 - this.margin.top - this.margin.bottom);
            this.xScale = d3.scaleLinear().domain([0, 1]).range([0, width]);
            this.yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);
            let gLeft = w * this.margin.left;
            let gTop = h * this.margin.top;
            this.body.attr("transform", `translate(${gLeft},${gTop})`);

            // add title, labels
            this.title = this.svg.append("text")
                .text(this.parameters.title)
                .attr("transform", `translate(${0.5*w},${0.5*h*this.margin.top})`)
                .attr("dominant-baseline", "center")
                .attr("text-anchor", "middle");
            this.xLabel = this.svg.append("text")
                .text(this.parameters.xLabel)
                .attr("transform", `translate(${this.margin.left*w+0.5*width},${this.margin.top*h+height+this.margin.bottom*0.5*h})`)
                .attr("dominant-baseline", "center")
                .attr("text-anchor", "middle");
            this.yLabel = this.svg.append("text")
                .text(this.parameters.yLabel)
                .attr("transform", `translate(${0.5*this.margin.left*w},${this.margin.top*h+0.5*height}) rotate(-90)`)
                .attr("dominant-baseline", "center")
                .attr("text-anchor", "middle");

            // define axes
            this.xAxis = this.body.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", `translate(0,${height})`);
            this.yAxis = this.body.append("g")
                .attr("class", "axis axis--y");

            // update scales (seperating will support multi-series plots in the future)
            let xMin = d3.min(this.series, function(series) { return d3.min(series, function(d) { return d[0]; })});
            let xMax = d3.max(this.series, function(series) { return d3.max(series, function(d) { return d[0]; })});
            let yMin = d3.min(this.series, function(series) { return d3.min(series, function(d) { return d[1]; })});
            let yMax = d3.max(this.series, function(series) { return d3.max(series, function(d) { return d[1]; })});
            let xLim = this.series.length > 0 ? this.xScale.domain() : [xMin, xMax];
            let yLim = this.series.length > 0 ? this.yScale.domain() : [yMin, yMax];
            if (xMin < xLim[0]) { xLim[0] = xMin; }
            if (xLim[1] < xMax) { xLim[1] = xMax; }
            if (yMin < yLim[0]) { yLim[0] = yMin; }
            if (yLim[1] < yMax) { yLim[1] = yMax; }
            this.xScale.domain(xLim);
            this.yScale.domain(yLim);
            this.xAxis.call(d3.axisBottom(this.xScale));
            this.yAxis.call(d3.axisLeft(this.yScale));

            // for now, assume all series are scatter/points
            let series = this.body.append("g")
                .attr("class", "PointSeries");
            let points = series.selectAll("circle")
                .data(this.series[0])
                .enter()
                    .append("circle")
                    .attr("cx", function(d) { return this.xScale(d[0]); }.bind(this))
                    .attr("cy", function(d) { return this.yScale(d[1]); }.bind(this))
                    .attr("r", 4);

            this.attach();
            return this.subdom;
        }
    }

    return Figure;
});

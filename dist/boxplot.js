(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['react', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react'), require('underscore'));
    } else {
        root.Boxplot = factory(root.React, root._);
    }
}(this, function (React, _) {

    // Inspiration:
    //
    // - https://turgar.github.io/
    // - http://bl.ocks.org/mbostock/4061502
    // - http://bl.ocks.org/jensgrubert/7789216
    // - http://flowingdata.com/2008/02/15/how-to-read-and-use-a-box-and-whisker-plot/
    //
    var Boxplot = React.createClass({

        propTypes: {
            // Width of the svg element
            width: React.PropTypes.number.isRequired,
            // Height of the svg element
            height: React.PropTypes.number.isRequired,
            // Orientation of the plot. vertical means min values at the left,
            // horizontal means min values at the bottom.
            orientation: React.PropTypes.oneOf(['vertical', 'horizontal']),

            // Minimum and maximum values for the axis. Values outside this
            // range are clipped.
            min: React.PropTypes.number.isRequired,
            max: React.PropTypes.number.isRequired,

            // The stats to plot.
            stats: React.PropTypes.shape({
                // The tick of the lower whisker.
                whiskerLow: React.PropTypes.number.isRequired,
                // The lower end of the box.
                quartile1: React.PropTypes.number.isRequired,
                // The median.
                quartile2: React.PropTypes.number.isRequired,
                // The upper end of the box.
                quartile3: React.PropTypes.number.isRequired,
                // The tick of the upper whisker.
                whiskerHigh: React.PropTypes.number.isRequired,
                // The outliers.
                outliers: React.PropTypes.array,
            }),

            style: React.PropTypes.object,
            tickStyle: React.PropTypes.object,
            whiskerStrokeWidth: React.PropTypes.number,
            whiskerStyle: React.PropTypes.object,
            boxStyle: React.PropTypes.object,
            medianStrokeWidth: React.PropTypes.number,
            medianStyle: React.PropTypes.object,
            outlierRadius: React.PropTypes.number,
            outlierStyle: React.PropTypes.object,
        },

        getDefaultProps: function () {
            return {
                orientation: 'vertical',
                style: { strokeOpacity: 1, fillOpacity: 0.75 },
                // tickStyle: { stroke: 'black', strokeDasharray: '2,2' },
                tickStyle: { stroke: 'black' },
                whiskerStrokeWidth: 1.,
                // whiskerStyle: { stroke: 'black', strokeDasharray: '2,2' },
                whiskerStyle: { stroke: 'black' },
                boxStyle: { stroke: 'black', fill: 'black' },
                medianStrokeWidth: 2.,
                medianStyle: { stroke: 'white' },
                outlierRadius: 2.5,
                outlierStyle: { stroke: 'black', fill: 'black' },
            };
        },

        displayName: 'Boxplot',

        render: function () {
            var component = this,
                stats = this.props.stats;

            var xMax, horizScaleFactor, vertScaleFactor, transform;
            if (this.props.orientation == 'vertical') {
                xMax = this.props.width;

                vertScaleFactor = this.props.height / (this.props.max - this.props.min);
                horizScaleFactor = 1.0;

                // Coordinate system: +y at the top, +x to the right.
                transform =
                    'translate (' + -this.props.min + ', 0) ' +
                    'translate (0, ' + this.props.height + ') ' +
                    'scale(1, -' + vertScaleFactor + ')';
            } else {
                xMax = this.props.height;

                horizScaleFactor = this.props.width / (this.props.max - this.props.min);
                vertScaleFactor = 1.0;

                // Coordinate system: +y at the right, +x to the top.
                transform =
                    'scale(' + horizScaleFactor + ', 1) ' +
                    'translate (' + -this.props.min + ', 0) ' +
                    'translate (0, ' + this.props.height + ') ' +
                    'rotate(-90)';
            }

            var xMin = 0,
                xCenter = xMax / 2;

            return (
                React.createElement("svg", {width:  this.props.width, height:  this.props.height}, 
                    React.createElement("g", {transform:  transform, style:  this.props.style}, 
                        React.createElement("line", {
                            key: "tick-low", 
                            x1:  xMin, x2:  xMax, 
                            y1:  stats.whiskerLow, y2:  stats.whiskerLow, 
                            strokeWidth:  this.props.whiskerStrokeWidth / horizScaleFactor, 
                            style:  this.props.tickStyle}), 
                        React.createElement("line", {
                            key: "whisker-low", 
                            x1:  xCenter, x2:  xCenter, 
                            y1:  stats.whiskerLow, y2:  stats.quartile1, 
                            strokeWidth:  this.props.whiskerStrokeWidth / vertScaleFactor, 
                            style:  this.props.whiskerStyle}), 
                        React.createElement("rect", {
                            key: "box", 
                            x:  xMin, width:  xMax - xMin, 
                            y:  stats.quartile1, 
                            height:  stats.quartile3 - stats.quartile1, 
                            strokeWidth: "0", 
                            style:  this.props.boxStyle}), 
                        React.createElement("line", {
                            key: "median", 
                            x1:  xMin, x2:  xMax, 
                            y1:  stats.quartile2, y2:  stats.quartile2, 
                            strokeWidth:  this.props.medianStrokeWidth / horizScaleFactor, 
                            style:  this.props.medianStyle}), 
                        React.createElement("line", {
                            key: "whisker-high", 
                            x1:  xCenter, x2:  xCenter, 
                            y1:  stats.whiskerHigh, y2:  stats.quartile3, 
                            strokeWidth:  this.props.whiskerStrokeWidth / vertScaleFactor, 
                            style:  this.props.whiskerStyle}), 
                        React.createElement("line", {
                            key: "tick-high", 
                            x1:  xMin, x2:  xMax, 
                            y1:  stats.whiskerHigh, y2:  stats.whiskerHigh, 
                            strokeWidth:  this.props.whiskerStrokeWidth / horizScaleFactor, 
                            style:  this.props.tickStyle}), 
                        
                            _(stats.outliers).map(function (outlier, index) {
                                return (
                                    React.createElement("ellipse", {
                                        key:  'outlier-' + index, 
                                        cx:  xCenter, cy:  outlier, 
                                        rx:  component.props.outlierRadius / vertScaleFactor, 
                                        ry:  component.props.outlierRadius / horizScaleFactor, 
                                        strokeWidth: "0", 
                                        style:  component.props.outlierStyle})
                                );
                            })
                        
                    )
                )
            );
        },

    });

    return Boxplot;
}));

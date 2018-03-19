'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @class Boxplot
 */

var React = require('react');
var PropTypes = require('prop-types');

// Inspiration:
//
// - https://turgar.github.io/
// - http://bl.ocks.org/mbostock/4061502
// - http://bl.ocks.org/jensgrubert/7789216
// - http://flowingdata.com/2008/02/15/how-to-read-and-use-a-box-and-whisker-plot/
//
var Boxplot = function Boxplot(_ref) {
  var width = _ref.width,
      height = _ref.height,
      orientation = _ref.orientation,
      min = _ref.min,
      max = _ref.max,
      stats = _ref.stats,
      style = _ref.style,
      tickStyle = _ref.tickStyle,
      whiskerStrokeWidth = _ref.whiskerStrokeWidth,
      whiskerStyle = _ref.whiskerStyle,
      boxStyle = _ref.boxStyle,
      medianStrokeWidth = _ref.medianStrokeWidth,
      medianStyle = _ref.medianStyle,
      outlierRadius = _ref.outlierRadius,
      outlierStyle = _ref.outlierStyle;

  var xMax = void 0,
      horizScaleFactor = void 0,
      vertScaleFactor = void 0,
      transforms = void 0;
  if (orientation == 'vertical') {
    xMax = width;

    vertScaleFactor = height / (max - min);
    horizScaleFactor = 1.0;

    // Coordinate system: +y at the top, +x to the right.
    transforms = ['translate (' + -min + ', 0)', 'translate (0, ' + height + ')', 'scale(1, -' + vertScaleFactor + ')'];
  } else {
    xMax = height;

    horizScaleFactor = width / (max - min);
    vertScaleFactor = 1.0;

    // Coordinate system: +y at the right, +x to the top.
    transforms = ['scale(' + horizScaleFactor + ', 1) ', 'translate (' + -min + ', 0) ', 'translate (0, ' + height + ') ', 'rotate(-90)'];
  }

  var xMin = 0;
  var xCenter = xMax / 2;

  return React.createElement(
    'svg',
    { width: width, height: height },
    React.createElement(
      'g',
      { transform: transforms.join(' '), style: style },
      React.createElement('line', {
        key: 'tick-low',
        x1: xMin, x2: xMax,
        y1: stats.whiskerLow, y2: stats.whiskerLow,
        strokeWidth: whiskerStrokeWidth / horizScaleFactor,
        style: tickStyle }),
      React.createElement('line', {
        key: 'whisker-low',
        x1: xCenter, x2: xCenter,
        y1: stats.whiskerLow, y2: stats.quartile1,
        strokeWidth: whiskerStrokeWidth / vertScaleFactor,
        style: whiskerStyle }),
      React.createElement('rect', {
        key: 'box',
        x: xMin, width: xMax - xMin,
        y: stats.quartile1,
        height: stats.quartile3 - stats.quartile1,
        strokeWidth: '0',
        style: boxStyle }),
      React.createElement('line', {
        key: 'median',
        x1: xMin, x2: xMax,
        y1: stats.quartile2, y2: stats.quartile2,
        strokeWidth: medianStrokeWidth / horizScaleFactor,
        style: medianStyle }),
      React.createElement('line', {
        key: 'whisker-high',
        x1: xCenter, x2: xCenter,
        y1: stats.whiskerHigh, y2: stats.quartile3,
        strokeWidth: whiskerStrokeWidth / vertScaleFactor,
        style: whiskerStyle }),
      React.createElement('line', {
        key: 'tick-high',
        x1: xMin, x2: xMax,
        y1: stats.whiskerHigh, y2: stats.whiskerHigh,
        strokeWidth: whiskerStrokeWidth / horizScaleFactor,
        style: tickStyle }),
      stats.outliers.map(function (outlier, index) {
        return React.createElement('ellipse', {
          key: 'outlier-' + index,
          cx: xCenter, cy: outlier,
          rx: outlierRadius / vertScaleFactor,
          ry: outlierRadius / horizScaleFactor,
          strokeWidth: '0',
          style: outlierStyle });
      })
    )
  );
};
Object.assign(Boxplot, {
  propTypes: {
    // Width of the svg element
    width: PropTypes.number.isRequired,
    // Height of the svg element
    height: PropTypes.number.isRequired,
    // Orientation of the plot. vertical means min values at the left,
    // horizontal means min values at the bottom.
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),

    // Minimum and maximum values for the axis. Values outside this
    // range are clipped.
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,

    // The stats to plot.
    stats: PropTypes.shape({
      // The tick of the lower whisker.
      whiskerLow: PropTypes.number.isRequired,
      // The lower end of the box.
      quartile1: PropTypes.number.isRequired,
      // The median.
      quartile2: PropTypes.number.isRequired,
      // The upper end of the box.
      quartile3: PropTypes.number.isRequired,
      // The tick of the upper whisker.
      whiskerHigh: PropTypes.number.isRequired,
      // The outliers.
      outliers: PropTypes.array
    }),

    style: PropTypes.object,
    tickStyle: PropTypes.object,
    whiskerStrokeWidth: PropTypes.number,
    whiskerStyle: PropTypes.object,
    boxStyle: PropTypes.object,
    medianStrokeWidth: PropTypes.number,
    medianStyle: PropTypes.object,
    outlierRadius: PropTypes.number,
    outlierStyle: PropTypes.object
  },

  defaultProps: {
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
    outlierStyle: { stroke: 'black', fill: 'black' }
  }
});

var ss = require('simple-statistics');

function computeBoxplotStats(data) {
  var quartile2 = ss.median(data);

  var quartile1 = ss.quantile(data, 0.25);
  var quartile3 = ss.quantile(data, 0.75);
  var interQuartileRange = quartile3 - quartile1;

  var lowerOutlierCutoff = quartile1 - 1.5 * interQuartileRange;
  var upperOutlierCutoff = quartile3 + 1.5 * interQuartileRange;

  var outliers = [],
      nonOutliers = [];
  data.forEach(function (datum) {
    if (datum < lowerOutlierCutoff || datum > upperOutlierCutoff) {
      outliers.push(datum);
    } else {
      nonOutliers.push(datum);
    }
  });

  var whiskerLow = ss.min(nonOutliers);
  var whiskerHigh = ss.max(nonOutliers);

  return {
    whiskerLow: whiskerLow,
    quartile1: quartile1,
    quartile2: quartile2,
    quartile3: quartile3,
    whiskerHigh: whiskerHigh,
    outliers: outliers
  };
}

exports.Boxplot = Boxplot;
exports.computeBoxplotStats = computeBoxplotStats;

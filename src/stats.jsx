(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'simple-statistics'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('simple-statistics'));
    } else {
        root.computeBoxplotStats = factory(root._, root.ss);
    }
}(this, function (_, ss) {

    var computeBoxplotStats = function (data) {

        var median = ss.median(data);

        var lowerQuartile = ss.quantile(data, 0.25),
            upperQuartile = ss.quantile(data, 0.75),
            interQuartileRange = upperQuartile - lowerQuartile;

        var lowerOutlierCutoff = lowerQuartile - 1.5 * interQuartileRange,
            upperOutlierCutoff = upperQuartile + 1.5 * interQuartileRange;

        var outliers = [], nonOutliers = [];
        _(data).each(function (datum) {
            if (datum < lowerOutlierCutoff || datum > upperOutlierCutoff) {
                outliers.push(datum);
            } else {
                nonOutliers.push(datum);
            }
        });

        var minimum = ss.min(nonOutliers),
            maximum = ss.max(nonOutliers);

        return {
            whiskerLow: minimum,
            quartile1: lowerQuartile,
            quartile2: median,
            quartile3: upperQuartile,
            whiskerHigh: maximum,
            outliers: outliers,
        };
    };

    return computeBoxplotStats;
}));

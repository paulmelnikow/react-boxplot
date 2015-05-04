(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'simple-statistics'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('underscore'), require('simple-statistics'));
    } else {
        root.computeBoxplotStats = factory(root._, root.simpleStatistics);
    }
}(this, function (_, simpleStatistics) {

    var computeBoxplotStats = function (data) {

        var median = simpleStatistics.median(data);

        var lowerQuartile = simpleStatistics.quantile(data, 0.25),
            upperQuartile = simpleStatistics.quantile(data, 0.75),
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

        var minimum = simpleStatistics.min(nonOutliers),
            maximum = simpleStatistics.max(nonOutliers);

        return {
            minimum: minimum,
            lowerQuartile: lowerQuartile,
            median: median,
            upperQuartile: upperQuartile,
            maximum: maximum,
            outliers: outliers,
        };
    };

    return computeBoxplotStats;
}));

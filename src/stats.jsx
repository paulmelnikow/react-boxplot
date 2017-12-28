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

        var quartile2 = ss.median(data);

        var quartile1 = ss.quantile(data, 0.25),
            quartile3 = ss.quantile(data, 0.75),
            interQuartileRange = quartile3 - quartile1;

        var lowerOutlierCutoff = quartile1 - 1.5 * interQuartileRange,
            upperOutlierCutoff = quartile3 + 1.5 * interQuartileRange;

        var outliers = [], nonOutliers = [];
        _(data).each(function (datum) {
            if (datum < lowerOutlierCutoff || datum > upperOutlierCutoff) {
                outliers.push(datum);
            } else {
                nonOutliers.push(datum);
            }
        });

        var whiskerLow = ss.min(nonOutliers),
            whiskerHigh = ss.max(nonOutliers);

        return {
            whiskerLow: whiskerLow,
            quartile1: quartile1,
            quartile2: quartile2,
            quartile3: quartile3,
            whiskerHigh: whiskerHigh,
            outliers: outliers,
        };
    };

    return computeBoxplotStats;
}));

const ss = require('simple-statistics')

export default function computeBoxplotStats(data) {
  const quartile2 = ss.median(data)

  const quartile1 = ss.quantile(data, 0.25)
  const quartile3 = ss.quantile(data, 0.75)
  const interQuartileRange = quartile3 - quartile1

  const lowerOutlierCutoff = quartile1 - 1.5 * interQuartileRange
  const upperOutlierCutoff = quartile3 + 1.5 * interQuartileRange

  const outliers = [],
    nonOutliers = []
  data.forEach(datum => {
    if (datum < lowerOutlierCutoff || datum > upperOutlierCutoff) {
      outliers.push(datum)
    } else {
      nonOutliers.push(datum)
    }
  })

  const whiskerLow = ss.min(nonOutliers)
  const whiskerHigh = ss.max(nonOutliers)

  return {
    whiskerLow,
    quartile1,
    quartile2,
    quartile3,
    whiskerHigh,
    outliers,
  }
}

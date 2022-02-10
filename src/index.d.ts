import * as React from 'react'

declare class Boxplot extends React.Component<
  {
    width: number
    height: number
    orientation?: 'vertical' | 'horizontal'
    min: number
    max: number
    stats?: {
      whiskerLow: number
      quartile1: number
      quartile2: number
      quartile3: number
      whiskerHigh: number
      outliers?: number[]
    }
    style?: Object
    tickStyle?: Object
    whiskerStrokeWidth?: number
    whiskerStyle?: Object
    boxStyle?: Object
    medianStrokeWidth?: number
    medianStyle?: Object
    outlierRadius?: number
    outlierStyle: Object
  },
  any
> {}

export default Boxplot

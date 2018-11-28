import React from 'react'
import styled from 'styled-components'
import { Boxplot, computeBoxplotStats } from 'react-boxplot'

const StyledMain = styled.main`
  background-color: #ddd;
`

const StyledBoxplot = styled(Boxplot)`
  margin: 10px;
  border: solid 20px #ccc;
  border-radius: 3px;
  background-color: white;
`

const plotAttrs = [
  {
    width: 400,
    height: 25,
    orientation: 'horizontal',
    min: 0,
    max: 300,
    stats: {
      whiskerLow: 194.3,
      quartile1: 201,
      quartile2: 234.5,
      quartile3: 254.6,
      whiskerHigh: 257.95,
      outliers: [50, 75, 184.25, 268, 290],
    },
  },
  {
    width: 400,
    height: 25,
    orientation: 'horizontal',
    min: -150,
    max: 150,
    stats: {
      whiskerLow: 44.3,
      quartile1: 51,
      quartile2: 84.5,
      quartile3: 104.6,
      whiskerHigh: 107.95,
      outliers: [-100, -75, 34.25, 118, 140],
    },
  },
  {
    width: 400,
    height: 25,
    orientation: 'horizontal',
    min: 0,
    max: 3000,
    stats: {
      whiskerLow: 1943,
      quartile1: 2010,
      quartile2: 2345,
      quartile3: 2546,
      whiskerHigh: 2579.5,
      outliers: [500, 750, 1842.5, 2680, 2900],
    },
  },
  {
    width: 400,
    height: 25,
    orientation: 'horizontal',
    min: 0,
    max: 30,
    stats: {
      whiskerLow: 19.43,
      quartile1: 20.1,
      quartile2: 23.45,
      quartile3: 25.46,
      whiskerHigh: 25.795,
      outliers: [5, 7.5, 18.425, 26.8, 29],
    },
  },
  {
    width: 400,
    height: 25,
    orientation: 'horizontal',
    min: -100,
    max: 300,
    stats: {
      whiskerLow: 194.3,
      quartile1: 201,
      quartile2: 234.5,
      quartile3: 254.6,
      whiskerHigh: 257.95,
      outliers: [-80, -20, 50, 75, 184.25, 268, 290],
    },
  },
  {
    width: 600,
    height: 25,
    orientation: 'horizontal',
    min: 0,
    max: 300,
    stats: {
      whiskerLow: 194.3,
      quartile1: 201,
      quartile2: 234.5,
      quartile3: 254.6,
      whiskerHigh: 257.95,
      outliers: [50, 75, 184.25, 268, 290],
    },
  },
  {
    width: 900,
    height: 25,
    orientation: 'horizontal',
    min: 0,
    max: 300,
    stats: {
      whiskerLow: 194.3,
      quartile1: 201,
      quartile2: 234.5,
      quartile3: 254.6,
      whiskerHigh: 257.95,
      outliers: [50, 75, 184.25, 268, 290],
    },
  },
  {
    width: 400,
    height: 25,
    orientation: 'horizontal',
    min: 0,
    max: 30,
    stats: computeBoxplotStats(
      '14 15 16 16 17 17 17 17 17 18 18 18 18 18 18 19 19 19 20 20 20 20 20 20 21 21 22 23 24 24 29'
        .split(' ')
        .map(d => parseInt(d, 10))
    ),
  },
  {
    width: 150,
    height: 15,
    orientation: 'horizontal',
    min: 10,
    max: 99,
    stats: {
      whiskerLow: 86.2,
      quartile1: 91.1,
      quartile2: 100,
      quartile3: 118,
      whiskerHigh: 143,
      outliers: [],
    },
  },
]

const App = () => (
  <StyledMain>
    {plotAttrs.map(attrs => [<StyledBoxplot {...attrs} />, <br />])}
  </StyledMain>
)
export default App

import React from 'react'
import renderer from 'react-test-renderer'
import { Boxplot, computeBoxplotStats } from './'

describe('Boxplot', function () {
  it('renders without crashing', function () {
    const attrs = {
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
    }

    renderer.create(<Boxplot {...attrs} />)
  })
})

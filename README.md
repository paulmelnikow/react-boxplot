react-boxplot
=============

Simple SVG box plots in React.

[![NPM](https://img.shields.io/npm/v/react-boxplot.svg)](https://www.npmjs.com/package/react-boxplot) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Install
-------

```bash
yarn add react-boxplot
npm install --save react-boxplot
```


Usage
-----

```jsx
import React, { Component } from 'react'
import { Boxplot, computeBoxplotStats } from 'react-boxplot'

const values = [
  14, 15, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 19,
  19, 19, 20, 20, 20, 20, 20, 20, 21, 21, 22, 23, 24, 24, 29,
]

const Example = () => (
  <Boxplot
    width={ 400 } height={ 20 } orientation="horizontal"
    min={ 0 } max={ 30 }
    stats={ computeBoxplotStats(values) } />
)
```

<img src="https://paulmelnikow.github.io/react-boxplot/example1.png" width="400">

Or you can compute the stats yourself:

```jsx
const Example = () => (
  <Boxplot
    width={ 400 } height={ 25 } orientation="horizontal"
    min={ 0 } max={ 300 }
    stats={ {
      whiskerLow: 194.3,
      quartile1: 201,
      quartile2: 234.5,
      quartile3: 254.6,
      whiskerHigh: 257.95,
      outliers: [ 50, 75, 184.25, 268, 290 ],
    } } />
)
```

<img src="https://paulmelnikow.github.io/react-boxplot/example2.png" width="400">


Features
--------

- Pure SVG.
- Horizonal or vertical orientation.
- The scale of the major axis matches the original data.


Development
-----------

In one terminal, start the build for the library:

```sh
yarn
yarn start
```

And, in a second terminal, start the build for the example app:

```sh
cd example
yarn
yarn start
```

Contribute
----------

- [Issue tracker][issues]
- [Source code][source]

Pull requests welcome!


Acknowledgements
----------------

This library was developed by Paul Melnikow while working at Body Labs. This
is a fork of [the original repo][bodylabs], now abandoned, being maintained by
its original author.

[bodylabs]: https://github.com/bodylabs/react-boxplot


License
-------

The project is licensed under the two-clause BSD license.


[issues]: https://github.com/paulmelnikow/react-boxplot/issues
[source]: https://github.com/paulmelnikow/react-boxplot

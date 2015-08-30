react-boxplot
=============

Simple SVG box plots in React.

```
var Boxplot = require('react-boxplot'),
    computeBoxplotStats = require('react-boxplot/dist/stats');

var values = [
    14, 15, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 20, 20, 20, 20, 20, 20, 21, 21, 22, 23, 24, 24, 29,
];

React.render(
    React.createElement(Boxplot, {
        width: 400,
        height: 25,
        orientation: 'horizontal',
        min: 0,
        max: 30,
        stats: computeBoxplotStats(values),
    }),
    document.getElementById('chart')
);
```

<img src="https://bodylabs.github.io/react-boxplot/example1.png" width="400">

Or you can compute the stats yourself:

```
React.render(
    React.createElement(Boxplot, {
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
            outliers: [ 50, 75, 184.25, 268, 290 ],
        },
    }),
    document.getElementById('chart')
);
```

<img src="https://bodylabs.github.io/react-boxplot/example2.png" width="400">


Features
--------

- Pure SVG.
- Horizonal or vertical orientation.
- The scale of the major axis matches the original data.


Installation
------------

    npm install react-boxplot


Development
-----------

1. Clone the repository.
2. `npm install`
3. `npm run watch`
4. `npm run open`


Contribute
----------

- [Issue tracker][issues]
- [Source code][source]

Pull requests welcome!


License
-------

The project is licensed under the two-clause BSD license.


[issues]: https://github.com/bodylabs/react-boxplot/issues
[source]: https://github.com/bodylabs/react-boxplot

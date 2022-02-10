# Changelog

## 4.0.0 -- Feb 10, 2022

- BREAKING CHANGE: Make Boxplot the default export.
- Add TypeScript typings.
- Support React 17.

## 3.l.0 -- Jan 1, 2019

- Support React 16.8.
- Upgrade to Babel 7 and Rollup 1.
- Switch test runner back to Mocha.
- Update example app.

## 3.0.1 -- Jan 1, 2019

Fix publishing error from previous.

## 3.0.0 -- Jan 1, 2019

- Update `simple-statistics` to 7.0.0, dropping support for IE11.

## 2.0.1 -- Dec 17, 2018

Update build dependencies.

## 2.0.0 -- Nov 19, 2018

Update dependencies. There is a breaking change in [simple-statistics][].
Whereas invalid values used to return `NaN`, they now raise an exception.

[simple-stastics]: https://github.com/simple-statistics/simple-statistics/blob/master/CHANGELOG.md#300-2017-04-06

## [1.1.0]

For compatibility with CSS in JS, pass through `className` property from
Boxplot to the enclosed svg element.

## [1.0.0]

Modernize the project using [create-react-library][].

The API is entirely the same, though it's now imported differently.

[create-react-library]: https://github.com/transitive-bullshit/create-react-library

## [0.4.0]

- Support React 16 (@jonrovira)
- Update for bodylabs -> paulmelnikow

[unreleased]: https://github.com/paulmelnikow/icedfrisby-nock/compare/1.1.0...HEAD
[1.1.0]: https://github.com/paulmelnikow/icedfrisby-nock/compare/1.0.0...0.1.0
[1.0.0]: https://github.com/paulmelnikow/icedfrisby-nock/compare/1.0.0...0.4.0
[0.4.0]: https://github.com/paulmelnikow/icedfrisby-nock/compare/0.4.0...0.3.1

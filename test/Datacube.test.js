'use strict'

var tape = require('tape')
var Datacube = require('../src/Datacube')
var rectangularPrism = require('./fixtures/rectangularPrism.json')

tape('Datacube', function (t) {
  var dc = new Datacube({ data: rectangularPrism })
  t.deepEquals(dc.dims, { x: 3, y: 4, z: 5 }, 'dims')
  t.end()
})

tape('Datacube::querySlice', function (t) {
  var dc = new Datacube({ data: rectangularPrism })
  var slice

  slice = dc.querySlice({ axis: 'x', value: 1 })
  var xExpected = [
    [21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40]
  ]
  t.deepEqual(slice, xExpected, 'slice matches expectation')
  t.equals(slice.length, 4, 'slice matches expectation')

  slice = dc.querySlice({ axis: 'y', value: 2 })
  var yExpected = [
    [11, 12, 13, 14, 15],
    [31, 32, 33, 34, 35],
    [51, 52, 53, 54, 55]
  ]
  t.deepEqual(slice, yExpected, 'slice matches expectation')
  t.equals(slice.length, 3, 'slice matches expectation')

  slice = dc.querySlice({ axis: 'z', value: 4 })
  t.deepEqual(slice[2], [45, 50, 55, 60], 'slice matches expectation')
  t.equals(slice.length, 3, 'slice matches expectation')

  t.end()
})

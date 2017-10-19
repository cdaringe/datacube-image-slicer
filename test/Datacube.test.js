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
  t.deepEqual(slice[0], [1, 2, 3, 4, 5], 'slice matches expectation')
  t.equals(slice.length, 4, 'slice matches expectation')

  slice = dc.querySlice({ axis: 'y', value: 1 })
  t.deepEqual(slice[0], [1, 2, 3, 4, 5], 'slice matches expectation')
  t.deepEqual(slice[1], [1, 2, 3, 4, 5], 'slice matches expectation')
  t.equals(slice.length, 3, 'slice matches expectation')

  slice = dc.querySlice({ axis: 'z', value: 1 })
  t.deepEqual(slice[0], [2, 2, 2, 2], 'slice matches expectation')
  t.equals(slice.length, 3, 'slice matches expectation')

  t.end()
})

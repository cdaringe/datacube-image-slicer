'use strict'

var times = require('lodash/times')
var core = require('mathjs/core')
var math = core.create()
math.import(require('mathjs/lib/type/matrix'))
math.import(require('mathjs/lib/function/matrix/subset'))

/**
 * @typedef DatacubeOptions
 * @property {Number[][][]} data
 */

 /**
 * @memberOf Datacube
 * @property {mathjs.Matrix} data
 * @property {Object<string, Number>} midpoints
 * @property {Object<string, Number>} dims lengths of each dimension
 * @property {Number[]} xRange
 * @property {Number[]} yRange
 * @property {Number[]} zRange
 */

 /**
 * @class Datacube
 * @param {DatacubeOptions} opts
 */
function Datacube (opts) {
  this.data = math.matrix(opts.data)
  var size = this.data.size()
  this.dims = {
    x: size[0],
    y: size[1],
    z: size[2]
  }
  this.midpoints = {
    x: Math.floor(this.dims.x / 2),
    y: Math.floor(this.dims.y / 2),
    z: Math.floor(this.dims.z / 2)
  }
  this.xRange = times(this.dims.x)
  this.yRange = times(this.dims.y)
  this.zRange = times(this.dims.z)
}

/**
 * Query a planar slice at the provided point in the remaining axies
 * @param {Object} opts
 * @param {string} opts.axis axis, x, y, or z
 * @param {Number} opts.value
 */
Datacube.prototype.querySlice = function (opts) {
  var index
  if (opts.axis === 'x') {
    index = math.index(opts.value, this.yRange, this.zRange)
    return math.subset(this.data, index).toArray()[0]
  } else if (opts.axis === 'y') {
    index = math.index(this.xRange, opts.value, this.zRange)
    return math.subset(this.data, index).toArray()
    .map(function (y, xi) { return y[0] })
  } else if (opts.axis === 'z') {
    index = math.index(this.xRange, this.yRange, opts.value)
    return math.subset(this.data, index).toArray()
    .map(function (yi, xi) { return yi.map(function (z) { return z[0] }) })
  }
  throw new Error('invalid axis')
}

module.exports = Datacube

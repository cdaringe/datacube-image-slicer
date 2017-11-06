'use strict'

var Datacube = require('./Datacube')
var isNil = require('lodash/isNil')

/**
 * @typedef View
 * @property {HTMLCanvasElement} node
 * @property {Number[][][]} data
 * @property {string} axis
 * @property {Function} [onMouseMove]
 * @property {boolean} [matchCanvasToData=true] sets height and width to the same dims as the data from the axis perspective
 */
/**
 * @memberOf DatacubeView
 * @property {HTMLCanvasElement} node
 * @property {ClientRect} nodeRect
 * @property {Datacube} datacube
 */

/**
 * @class DatacubeView
 * @param {View} view
 */
function DatacubeView (view) {
  this.datacube = new Datacube({ data: view.data })
  this.node = view.node
  this.axis = view.axis
  if (view.onMouseMove) this.onMouseMove = view.onMouseMove
  this.ctx = this.node.getContext('2d')
  this.node.addEventListener('mousemove', this.mousemove.bind(this))
  this.position = Object.assign({}, this.datacube.midpoints)
  if (view.matchCanvasToData || isNil(view.matchCanvasToData)) this.matchCanvasToData()
  this.render()
}

/**
 * @private
 */
DatacubeView.prototype.constrainAxisPosition = function (opts) {
  var axis = opts.axis
  var requested = opts.requested
  if (requested <= 0) return 0
  else if (requested >= this.datacube.dims[axis]) return this.datacube.dims[axis] - 1
  return requested
}

/**
 * Resize datacube canvas node height & width to match data slice dimensions.
 * @returns {undefined}
 */
DatacubeView.prototype.matchCanvasToData = function () {
  if (this.axis === 'x') {
    this.node.height = this.datacube.dims.z
    this.node.width = this.datacube.dims.y
  } else if (this.axis === 'y') {
    this.node.height = this.datacube.dims.z
    this.node.width = this.datacube.dims.x
  } else { // z
    this.node.height = this.datacube.dims.y
    this.node.width = this.datacube.dims.x
  }
}

/**
 * Handles a mousemove event on the canvas node & updates the view's `position`
 * value.
 * @param {Event} evt
 * @returns {undefined}
 */
DatacubeView.prototype.mousemove = function (evt) {
  if (this.axis === 'x') {
    this.position.y = this.constrainAxisPosition({ axis: 'y', requested: evt.offsetX })
    this.position.z = this.constrainAxisPosition({ axis: 'z', requested: evt.offsetY })
  } else if (this.axis === 'y') {
    this.position.x = this.constrainAxisPosition({ axis: 'x', requested: evt.offsetX })
    this.position.z = this.constrainAxisPosition({ axis: 'z', requested: evt.offsetY })
  } else { // z
    this.position.x = this.constrainAxisPosition({ axis: 'x', requested: evt.offsetX })
    this.position.y = this.constrainAxisPosition({ axis: 'y', requested: evt.offsetY })
  }
  if (this.onMouseMove) this.onMouseMove(this)
}

/**
 * Renders the 2D slice of the data onto the canvas based on
 * the view's current `position`.
 * @returns {undefined}
 */
DatacubeView.prototype.render = function () {
  var slice = this.datacube.querySlice({
    axis: this.axis,
    value: Math.floor(this.position[this.axis])
  })
  var width = slice.length
  var height = slice[0].length
  var image = this.ctx.createImageData(width, height)
  var pixelRgbaIndex = -1
  for (var x = 0; x < slice.length; ++x) {
    for (var y = 0; y < slice[0].length; ++y) {
      var pixelValue = slice[x][y]
      image.data[++pixelRgbaIndex] = 0
      image.data[++pixelRgbaIndex] = 0
      image.data[++pixelRgbaIndex] = 0
      image.data[++pixelRgbaIndex] = pixelValue
    }
  }
  this.ctx.putImageData(image, 0, 0)
}

module.exports = DatacubeView

# datacube-image-slicer

[![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/datacube-image-slicer.svg)](https://greenkeeper.io/)

generate 2d slices from 3d data & paint them onto a HTML5 canvas.

![](https://raw.githubusercontent.com/MRN-Code/datacube-image-slicer/master/img/mri_animated.gif)

## install

- `npm install --save datacube-image-slicer`

## usage

```js
const res = await window.fetch('/url/to/brain.json')
const data = await res.json() // 3D array of ints, 0-255
new DatacubeView({
  data,
  node: document.getElementById('#brain-canvas'),
  axis: 'x', // y, or z
  onMouseMove: function (datacubeView) {
    console.log(datacubeView.position)
    otherView.position = datacubeView.position
    otherView.render()
  }
}))
```

more information is available in the [API docs](https://mrn-code.github.io/datacube-image-slicer)

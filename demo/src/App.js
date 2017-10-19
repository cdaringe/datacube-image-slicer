import React, { Component } from 'react'

var dummyBrainJson = require('url-loader!./sample-data/cubeData.json') // eslint-disable-line
var { DatacubeView } = require('datacube-image-slicer')

class App extends Component {
  async componentDidMount () {
    const res = await window.fetch(dummyBrainJson)
    const data = await res.json()
    var views = [
      { data, node: this.a, axis: 'x' },
      { data, node: this.b, axis: 'y' },
      { data, node: this.c, axis: 'z' }
    ].map(({ data, node, axis }) => new DatacubeView({ data, node, axis }))
    var animationQueue = -1
    function renderAllViews (view) {
      ++animationQueue
      window.requestAnimationFrame(function () {
        if (animationQueue) return --animationQueue
        var toRender = views.filter(v => v !== view)
        toRender.forEach(otherView => {
          otherView.position = view.position
          otherView.render()
        })
        --animationQueue
      })
    }
    views.forEach(view => { view.onMouseMove = renderAllViews.bind(this) })
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>demo</h1>
        </header>
        <div className='brains'>
          <div className='brains-left'>
            <canvas id='a' height='128px' width='128px' className='brain-slice' ref={a => { this.a = a }} />
            <canvas id='b' height='128px' width='128px' className='brain-slice' ref={b => { this.b = b }} />
          </div>
          <div className='brains-right'>
            <canvas id='c' height='128px' width='128px' className='brain-slice' ref={c => { this.c = c }} />
          </div>
        </div>
        <hr />
        <iframe style={{ border: 0, width: '100%', height: '100%' }} src='docs/'
          title='api-docs' />
      </div>
    )
  }
}

export default App

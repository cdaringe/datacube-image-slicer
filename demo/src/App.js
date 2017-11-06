import React, { Component } from 'react'
import logo from './logo.svg'

var dummyBrainJson = require('file-loader!./sample-data/brain.json') // eslint-disable-line
var { DatacubeView } = require('datacube-image-slicer')

class App extends Component {
  async componentDidMount () {
    const res = await window.fetch(dummyBrainJson)
    const data = await res.json()
    var views = [
      { data, node: this.a, axis: 'x', matchCanvasToData: true },
      { data, node: this.b, axis: 'y', matchCanvasToData: true },
      { data, node: this.c, axis: 'z', matchCanvasToData: true }
    ].map(view => new DatacubeView(view))
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
          <img src={logo} width='100px' alt='logo' />
          <h1 className='App-title'>datacube-image-slicer</h1>
        </header>
        <div className='brains'>
          <div className='brain-col brains-left'>
            <figure>
              <div style={{float: 'right'}}>
                <canvas id='a' className='brain-slice brain-slice-a' ref={a => { this.a = a }} />
                <canvas id='b' className='brain-slice brain-slice-b' ref={b => { this.b = b }} />
              </div>
              <figcaption className='left-caption'>
                <div>
                  <p className='caption-xy'>x-y</p>
                  <p className='caption-xz'>x-z</p>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className='brain-col brains-right'>
            <figure>
              <canvas id='c' className='brain-slice  brain-slice-c' ref={c => { this.c = c }} />
              <figcaption>
                <div>
                  <p className='caption-yz'>y-z</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <p>
          Hover your mouse over the above frames.
        </p>
        <hr />
        <iframe style={{ border: 0, width: '100%', height: '100%' }} src='docs/'
          title='api-docs' />
      </div>
    )
  }
}

export default App
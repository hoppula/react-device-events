# react-device-events

> Provides React higher order components for [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent) and [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)

Your wrapped component gets re-rendered after any `deviceorientation` or `devicemotion` event.

## Installation

`npm install -S react-device-events`

## Usage

### DeviceOrientation

```
import React from 'react'
import { deviceOrientation } from 'react-device-events'

class OrientationComponent extends React.Component {
  render() {
    const { supported, gamma, beta, alpha, orientation} = this.props.deviceOrientation
    return (
      <ul>
        <li><strong>Supported:</strong> {supported ? "true" : "false"}</li>
        <li><strong>Gamma:</strong> {gamma}</li>
        <li><strong>Beta:</strong> {beta}</li>
        <li><strong>Alpha:</strong> {alpha}</li>
        <li><strong>Orientation:</strong> {orientation}</li>
      </ul>
    )
  }
}

export default deviceOrientation(OrientationComponent)
```

### DeviceMotion

```
import React from 'react'
import { deviceMotion } from 'react-device-events'

class MotionComponent extends React.Component {
  render() {
    const { supported, acceleration, accelerationIncludingGravity, rotationRate, interval } = this.props.deviceMotion
    const [accelerationX, accelerationY, accelerationZ] = acceleration || []
    const [gravityX, gravityY, gravityZ] = accelerationIncludingGravity || []
    const [alpha, beta, gamma] = rotationRate || []
    return (
      <ul>
        <li><strong>Supported:</strong> {supported ? "true" : "false"}</li>
        <li><strong>Acceleration:</strong> {accelerationX} {accelerationY} {accelerationZ}</li>
        <li><strong>Acceleration including gravity:</strong> {gravityX} {gravityY} {gravityZ}</li>
        <li><strong>Rotation rate:</strong> {alpha} {beta} {gamma}</li>
        <li><strong>Interval:</strong> {interval}</li>
      </ul>
    )
  }
}

export default deviceMotion(MotionComponent)
```

## License

MIT

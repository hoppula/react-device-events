var React = require('react')
var extend = require('./extend')

module.exports = function deviceMotion(Component) {
  var WrappedComponent = React.createFactory(Component)
  var DeviceMotionWrapper = React.createClass({
    displayName: "DeviceMotionWrapper",

    getInitialState: function() {
      return {
        supported: false,
        acceleration: null,
        accelerationIncludingGravity: null,
        rotationRate: null,
        interval: null
      }
    },

    componentWillMount: function() {
      if (window && window.DeviceMotionEvent) {
        this.motionListener = this.handleMotionChange
        window.addEventListener('devicemotion', this.motionListener, false)
      }
    },

    componentWillUnmount: function() {
      if (window) {
        window.removeEventListener('devicemotion', this.motionListener, false)
      }
    },

    handleMotionChange: function(event) {
      this.setState({
        acceleration: [
          event.acceleration.x,
          event.acceleration.y,
          event.acceleration.z
        ],
        accelerationIncludingGravity: [
          event.accelerationIncludingGravity.x,
          event.accelerationIncludingGravity.y,
          event.accelerationIncludingGravity.z,
        ],
        rotationRate: [
          event.rotationRate.alpha,
          event.rotationRate.beta,
          event.rotationRate.gamma
        ],
        interval: event.interval
      })

      if (event.acceleration && event.accelerationIncludingGravity && event.rotationRate && event.interval) {
        this.setState({ supported: true })
      }
    },

    render: function() {
      return WrappedComponent(
        extend({}, this.props, {deviceMotion: this.state})
      )
    }
  })

  return DeviceMotionWrapper
}

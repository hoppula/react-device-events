var React = require('react')
var extend = require('./extend')

module.exports = function deviceOrientation(Component) {
  var WrappedComponent = React.createFactory(Component)
  var DeviceOrientationWrapper = React.createClass({
    displayName: "DeviceOrientationWrapper",

    getInitialState: function() {
      return {
        supported: false,
        gamma: null,
        beta: null,
        alpha: null,
        orientation: null
      }
    },

    componentWillMount: function() {
      if (window && window.DeviceOrientationEvent) {
        this.orientationListener = this.handleOrientationChange
        window.addEventListener('deviceorientation', this.orientationListener, false)
      }
    },

    componentWillUnmount: function() {
      if (window) {
        window.removeEventListener('deviceorientation', this.orientationListener, false)
      }
    },

    handleOrientationChange: function(event) {
      this.setState({
        gamma: event.gamma,
        beta: event.beta,
        alpha: event.alpha,
        orientation: window.orientation
      })

      if (event.gamma && event.beta && event.alpha) {
        this.setState({ supported: true })
      }
    },

    render: function() {
      return WrappedComponent(
        extend({}, this.props, {deviceOrientation: this.state})
      )
    }
  })

  return DeviceOrientationWrapper
}

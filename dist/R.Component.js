"use strict";

require("6to5/polyfill");
var Promise = require("bluebird");
module.exports = function (R) {
  var _ = R._;
  var should = R.should;
  var React = R.React;

  var Component = {
    Mixin: {
      _ComponentMixin: true,

      mixins: [R.Pure.Mixin, R.Async.Mixin, R.Animate.Mixin, R.Flux.Mixin],

      contextTypes: {
        flux: R.Flux.PropType },

      getFlux: function () {
        return this.context.flux;
      } } };

  return Component;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6L1VzZXJzL0VsaWUvZ2l0L3JlYWN0L3JlYWN0LXJhaWxzL3NyYy9SLkNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFTLENBQUMsRUFBRTtBQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2QsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN4QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOztBQUV0QixNQUFNLFNBQVMsR0FBRztBQUNoQixTQUFLLEVBQUU7QUFDTCxxQkFBZSxFQUFFLElBQUk7O0FBRXJCLFlBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQUVwRSxrQkFBWSxFQUFFO0FBQ1osWUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUN0Qjs7QUFFRCxhQUFPLEVBQUEsWUFBRztBQUNSLGVBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7T0FDMUIsRUFDRixFQUNGLENBQUM7O0FBRUYsU0FBTyxTQUFTLENBQUM7Q0FDbEIsQ0FBQyIsImZpbGUiOiJSLkNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJzZ0bzUvcG9seWZpbGwnKTtcbmNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihSKSB7XG4gIGNvbnN0IF8gPSBSLl87XG4gIGNvbnN0IHNob3VsZCA9IFIuc2hvdWxkO1xuICBjb25zdCBSZWFjdCA9IFIuUmVhY3Q7XG5cbiAgY29uc3QgQ29tcG9uZW50ID0ge1xuICAgIE1peGluOiB7XG4gICAgICBfQ29tcG9uZW50TWl4aW46IHRydWUsXG5cbiAgICAgIG1peGluczogW1IuUHVyZS5NaXhpbiwgUi5Bc3luYy5NaXhpbiwgUi5BbmltYXRlLk1peGluLCBSLkZsdXguTWl4aW5dLFxuXG4gICAgICBjb250ZXh0VHlwZXM6IHtcbiAgICAgICAgZmx1eDogUi5GbHV4LlByb3BUeXBlLFxuICAgICAgfSxcblxuICAgICAgZ2V0Rmx1eCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5mbHV4O1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBDb21wb25lbnQ7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
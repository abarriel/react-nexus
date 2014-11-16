"use strict";

require("6to5/polyfill");
var Promise = require("bluebird");
module.exports = function (R) {
  var _ = R._;
  var d3 = require("d3");
  var InterpolationTicker = require("./R.Animate.InterpolationTicker")(R);

  var Animate = {
    Mixin: {
      _AnimateMixin: true,
      _AnimateMixinInterpolationTickers: null,

      componentWillMount: function () {
        this._AnimateMixinInterpolationTickers = {};
      },

      componentWillUnmount: function () {
        var _this = this;
        Object.keys(this._AnimateMixinInterpolationTickers).forEach(function (name) {
          return _this._AnimateMixinInterpolationTickers[name].abort();
        });
        this._AnimateMixinInterpolationTickers = null;
      },

      isAnimating: function (name) {
        return this._AnimateMixinInterpolationTickers[name];
      },

      _AnimateMixinGetStateKey: function (name) {
        return "_AnimateMixinStyle-" + name;
      },

      getAnimatedStyle: function (name) {
        if (this.isAnimating(name)) {
          return this.state[this._AnimateMixinGetStateKey(name)];
        } else {
          _.dev(function () {
            return console.warn("R.Animate.Mixin.getAnimatedStyle(...): no such animation.");
          });
          return {};
        }
      },

      abortAnimation: function (name) {
        var _this2 = this;
        _.dev(function () {
          return _this2.isAnimating(name).should.be.ok;
        });
        if (this.isAnimating(name)) {
          this._AnimateMixinInterpolationTickers[name].abort();
        }
      },

      animate: function (name, params) {
        var _this3 = this;
        if (this.isAnimating(name)) {
          this.abortAnimation(name);
        }

        params = _.extend({}, params, {
          onTick: _.noop,
          onComplete: _.noop,
          onAbort: _.noop });

        var original = {
          onTick: params.onTick,
          onComplete: params.onComplete,
          onAbort: params.onAbort };

        params.onTick = function (animatedStyle, t) {
          original.onTick(animatedStyle, t);
          _this3.setStateIfMounted((function (_ref) {
            _ref[_this3._AnimateMixinGetStateKey(name)] = animatedStyle;
            return _ref;
          })({}));
        };

        params.onComplete = function (animatedStyle, t) {
          original.onComplete(animatedStyle, t);
          delete _this3._AnimateMixinInterpolationTickers[name];
          _this3.setStateIfMounted((function (_ref2) {
            _ref2[_this3._AnimateMixinGetStateKey(name)] = void 0;
            return _ref2;
          })({}));
        };

        params.onAbort = function () {
          original.onAbort();
          delete _this3._AnimateMixinInterpolationTickers[name];
          _this3.setStateIfMounted((function (_ref3) {
            _ref3[_this3._AnimateMixinGetStateKey(name)] = void 0;
            return _ref3;
          })({}));
        };

        var interpolationTicker = new R.Animate.InterpolationTicker(params);
        this._AnimateMixinInterpolationTickers[name] = interpolationTicker;
        interpolationTicker.start();
      } },

    createInterpolator: function (from, to) {
      return d3.interpolate(from, to);
    },

    createEasing: function (type, params) {
      if (params) {
        var args = _.clone(params);
        args.unshift(type);
        return d3.ease.apply(d3, args);
      } else {
        return d3.ease(type);
      }
    },

    InterpolationTicker: InterpolationTicker,

    shouldEnableHA: function () {
      if (_.isClient()) {
        var userAgent = navigator.userAgent;
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        var isGingerbread = /Android 2\.3\.[3-7]/i.test(userAgent);
        return userAgent && isMobile && !isGingerbread;
      } else {
        return true;
      }
    } };

  return Animate;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImc6L3JlYWN0LW5leHVzL3JlYWN0LXJhaWxzL3NyYy9SLkFuaW1hdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekIsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBUyxDQUFDLEVBQUU7QUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNkLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUUxRSxNQUFNLE9BQU8sR0FBRztBQUNkLFNBQUssRUFBRTtBQUNMLG1CQUFhLEVBQUUsSUFBSTtBQUNuQix1Q0FBaUMsRUFBRSxJQUFJOztBQUV2Qyx3QkFBa0IsRUFBQSxZQUFHO0FBQ25CLFlBQUksQ0FBQyxpQ0FBaUMsR0FBRyxFQUFFLENBQUM7T0FDN0M7O0FBRUQsMEJBQW9CLEVBQUEsWUFBRzs7QUFDckIsY0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FDbEQsT0FBTyxDQUFDLFVBQUMsSUFBSTtpQkFBSyxNQUFLLGlDQUFpQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTtTQUFBLENBQUMsQ0FBQztBQUN6RSxZQUFJLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDO09BQy9DOztBQUVELGlCQUFXLEVBQUEsVUFBQyxJQUFJLEVBQUU7QUFDaEIsZUFBTyxJQUFJLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDckQ7O0FBRUQsOEJBQXdCLEVBQUEsVUFBQyxJQUFJLEVBQUU7QUFDN0IsZUFBTyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7T0FDckM7O0FBRUQsc0JBQWdCLEVBQUEsVUFBQyxJ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O0FBQzNCLGFBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDakM7O0FBRUQsZ0JBQVksRUFBQSxVQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDekIsVUFBRyxNQUFNLEVBQUU7QUFDVCxZQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkIsZUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDaEMsTUFDSTtBQUNILGVBQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGOztBQUVELHVCQUFtQixFQUFuQixtQkFBbUI7O0FBRW5CLGtCQUFjLEVBQUEsWUFBRztBQUNmLFVBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO0FBQ2YsWUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUNwQyxZQUFJLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEcsWUFBSSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNELGVBQU8sU0FBUyxJQUFJLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQztPQUNoRCxNQUNJO0FBQ0gsZUFBTyxJQUFJLENBQUM7T0FDYjtLQUNGLEVBQ0YsQ0FBQzs7QUFFRixTQUFPLE9BQU8sQ0FBQztDQUNoQixDQUFDIiwiZmlsZSI6IlIuQW5pbWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJzZ0bzUvcG9seWZpbGwnKTtcbmNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihSKSB7XG4gIGNvbnN0IF8gPSBSLl87XG4gIGNvbnN0IGQzID0gcmVxdWlyZSgnZDMnKTtcbiAgY29uc3QgSW50ZXJwb2xhdGlvblRpY2tlciA9IHJlcXVpcmUoJy4vUi5BbmltYXRlLkludGVycG9sYXRpb25UaWNrZXInKShSKTtcblxuICBjb25zdCBBbmltYXRlID0ge1xuICAgIE1peGluOiB7XG4gICAgICBfQW5pbWF0ZU1peGluOiB0cnVlLFxuICAgICAgX0FuaW1hdGVNaXhpbkludGVycG9sYXRpb25UaWNrZXJzOiBudWxsLFxuXG4gICAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX0FuaW1hdGVNaXhpbkludGVycG9sYXRpb25UaWNrZXJzID0ge307XG4gICAgICB9LFxuXG4gICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fQW5pbWF0ZU1peGluSW50ZXJwb2xhdGlvblRpY2tlcnMpXG4gICAgICAgIC5mb3JFYWNoKChuYW1lKSA9PiB0aGlzLl9BbmltYXRlTWl4aW5JbnRlcnBvbGF0aW9uVGlja2Vyc1tuYW1lXS5hYm9ydCgpKTtcbiAgICAgICAgdGhpcy5fQW5pbWF0ZU1peGluSW50ZXJwb2xhdGlvblRpY2tlcnMgPSBudWxsO1xuICAgICAgfSxcblxuICAgICAgaXNBbmltYXRpbmcobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fQW5pbWF0ZU1peGluSW50ZXJwb2xhdGlvblRpY2tlcnNbbmFtZV07XG4gICAgICB9LFxuXG4gICAgICBfQW5pbWF0ZU1peGluR2V0U3RhdGVLZXkobmFtZSkge1xuICAgICAgICByZXR1cm4gJ19BbmltYXRlTWl4aW5TdHlsZS0nICsgbmFtZTtcbiAgICAgIH0sXG5cbiAgICAgIGdldEFuaW1hdGVkU3R5bGUobmFtZSkge1xuICAgICAgICBpZih0aGlzLmlzQW5pbWF0aW5nKG5hbWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVbdGhpcy5fQW5pbWF0ZU1peGluR2V0U3RhdGVLZXkobmFtZSldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIF8uZGV2KCgpID0+IGNvbnNvbGUud2FybignUi5BbmltYXRlLk1peGluLmdldEFuaW1hdGVkU3R5bGUoLi4uKTogbm8gc3VjaCBhbmltYXRpb24uJykpO1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYWJvcnRBbmltYXRpb24obmFtZSkge1xuICAgICAgICBfLmRldigoKSA9PiB0aGlzLmlzQW5pbWF0aW5nKG5hbWUpLnNob3VsZC5iZS5vayk7XG4gICAgICAgIGlmKHRoaXMuaXNBbmltYXRpbmcobmFtZSkpIHtcbiAgICAgICAgICB0aGlzLl9BbmltYXRlTWl4aW5JbnRlcnBvbGF0aW9uVGlja2Vyc1tuYW1lXS5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBhbmltYXRlKG5hbWUsIHBhcmFtcykge1xuICAgICAgICBpZih0aGlzLmlzQW5pbWF0aW5nKG5hbWUpKSB7XG4gICAgICAgICAgdGhpcy5hYm9ydEFuaW1hdGlvbihuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtcyA9IF8uZXh0ZW5kKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgICBvblRpY2s6IF8ubm9vcCxcbiAgICAgICAgICBvbkNvbXBsZXRlOiBfLm5vb3AsXG4gICAgICAgICAgb25BYm9ydDogXy5ub29wLFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgb3JpZ2luYWwgPSB7XG4gICAgICAgICAgb25UaWNrOiBwYXJhbXMub25UaWNrLFxuICAgICAgICAgIG9uQ29tcGxldGU6IHBhcmFtcy5vbkNvbXBsZXRlLFxuICAgICAgICAgIG9uQWJvcnQ6IHBhcmFtcy5vbkFib3J0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHBhcmFtcy5vblRpY2sgPSAoYW5pbWF0ZWRTdHlsZSwgdCkgPT4ge1xuICAgICAgICAgIG9yaWdpbmFsLm9uVGljayhhbmltYXRlZFN0eWxlLCB0KTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlSWZNb3VudGVkKHsgW3RoaXMuX0FuaW1hdGVNaXhpbkdldFN0YXRlS2V5KG5hbWUpXTogYW5pbWF0ZWRTdHlsZSB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBwYXJhbXMub25Db21wbGV0ZSA9IChhbmltYXRlZFN0eWxlLCB0KSA9PiB7XG4gICAgICAgICAgb3JpZ2luYWwub25Db21wbGV0ZShhbmltYXRlZFN0eWxlLCB0KTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fQW5pbWF0ZU1peGluSW50ZXJwb2xhdGlvblRpY2tlcnNbbmFtZV07XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZUlmTW91bnRlZCh7IFt0aGlzLl9BbmltYXRlTWl4aW5HZXRTdGF0ZUtleShuYW1lKV06IHZvaWQgMCB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBwYXJhbXMub25BYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICBvcmlnaW5hbC5vbkFib3J0KCk7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX0FuaW1hdGVNaXhpbkludGVycG9sYXRpb25UaWNrZXJzW25hbWVdO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGVJZk1vdW50ZWQoeyBbdGhpcy5fQW5pbWF0ZU1peGluR2V0U3RhdGVLZXkobmFtZSldOiB2b2lkIDAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGludGVycG9sYXRpb25UaWNrZXIgPSBuZXcgUi5BbmltYXRlLkludGVycG9sYXRpb25UaWNrZXIocGFyYW1zKTtcbiAgICAgICAgdGhpcy5fQW5pbWF0ZU1peGluSW50ZXJwb2xhdGlvblRpY2tlcnNbbmFtZV0gPSBpbnRlcnBvbGF0aW9uVGlja2VyO1xuICAgICAgICBpbnRlcnBvbGF0aW9uVGlja2VyLnN0YXJ0KCk7XG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBjcmVhdGVJbnRlcnBvbGF0b3IoZnJvbSwgdG8pIHtcbiAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZShmcm9tLCB0byk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUVhc2luZyh0eXBlLCBwYXJhbXMpIHtcbiAgICAgIGlmKHBhcmFtcykge1xuICAgICAgICBsZXQgYXJncyA9IF8uY2xvbmUocGFyYW1zKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KHR5cGUpO1xuICAgICAgICByZXR1cm4gZDMuZWFzZS5hcHBseShkMywgYXJncyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGQzLmVhc2UodHlwZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIEludGVycG9sYXRpb25UaWNrZXIsXG5cbiAgICBzaG91bGRFbmFibGVIQSgpIHtcbiAgICAgIGlmKF8uaXNDbGllbnQoKSkge1xuICAgICAgICBsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgbGV0IGlzTW9iaWxlID0gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KHVzZXJBZ2VudCk7XG4gICAgICAgIGxldCBpc0dpbmdlcmJyZWFkID0gL0FuZHJvaWQgMlxcLjNcXC5bMy03XS9pLnRlc3QodXNlckFnZW50KTtcbiAgICAgICAgcmV0dXJuIHVzZXJBZ2VudCAmJiBpc01vYmlsZSAmJiAhaXNHaW5nZXJicmVhZDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBBbmltYXRlO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
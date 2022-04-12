function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview The class of the gradient color legend
 * @author sima.zhang
 */
var _require = require('@antv/attr/lib'),
    ColorUtil = _require.ColorUtil; // TODO：ColorUtil 包需要从 attr 包中抽离


var Util = require('../../util');

var Continuous = require('./continuous');

var Color =
/*#__PURE__*/
function (_Continuous) {
  _inheritsLoose(Color, _Continuous);

  function Color() {
    return _Continuous.apply(this, arguments) || this;
  }

  var _proto = Color.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Continuous.prototype.getDefaultCfg.call(this);

    return Util.mix({}, cfg, {
      /**
       * 类型
       * @type {String}
       */
      type: 'color-legend',

      /**
       * 布局方式
       * horizontal 水平
       * vertical 垂直
       * @type {String}
       */
      layout: 'vertical',
      labelOffset: 15,
      lineStyle: {
        lineWidth: 1,
        stroke: '#fff'
      }
    });
  };

  _proto._renderSliderShape = function _renderSliderShape() {
    var slider = this.get('slider');
    var backgroundElement = slider.get('backgroundElement');
    var width = this.get('width');
    var height = this.get('height');
    var layout = this.get('layout');
    var items = this.get('items');
    var fill = '';
    var rgbColor;

    if (layout === 'vertical') {
      fill += 'l (90) ';
      Util.each(items, function (v) {
        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += 1 - v.scaleValue + ':' + rgbColor + ' ';
      });
    } else {
      fill += 'l (0) ';
      Util.each(items, function (v) {
        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += v.scaleValue + ':' + rgbColor + ' ';
      });
    }

    return this._addBackground(backgroundElement, 'Rect', {
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: fill,
      strokeOpacity: 0
    });
  };

  _proto._renderBackground = function _renderBackground() {
    var self = this;
    var titleShape = this.get('titleShape');
    var titleGap = this.get('titleGap');
    titleGap = titleShape ? titleShape.getBBox().height + titleGap : titleGap;
    var width = this.get('width');
    var height = this.get('height');
    var layout = this.get('layout');
    var items = this.get('items');
    var fill = '';
    var rgbColor;
    var path = [];
    var bgGroup = this.addGroup();

    if (layout === 'vertical') {
      fill += 'l (90) ';
      Util.each(items, function (v, index) {
        if (index !== 0 && index !== items.length - 1) {
          path.push(['M', 0, height - v.scaleValue * height]);
          path.push(['L', width, height - v.scaleValue * height]);
        }

        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += 1 - v.scaleValue + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: width + self.get('labelOffset') / 2,
            y: height - v.scaleValue * height,
            text: self._formatItemValue(v.value) + '' // 以字符串格式展示

          }, self.get('textStyle'), {
            textAlign: 'start'
          })
        });
      });
    } else {
      fill += 'l (0) ';
      Util.each(items, function (v, index) {
        if (index !== 0 && index !== items.length - 1) {
          path.push(['M', v.scaleValue * width, 0]);
          path.push(['L', v.scaleValue * width, height]);
        }

        rgbColor = ColorUtil.toRGB(v.attrValue);
        fill += v.scaleValue + ':' + rgbColor + ' ';
        bgGroup.addShape('text', {
          attrs: Util.mix({}, {
            x: v.scaleValue * width,
            y: height + self.get('labelOffset'),
            text: self._formatItemValue(v.value) + '' // 以字符串格式展示

          }, self.get('textStyle'))
        });
      });
    }

    bgGroup.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: width,
        height: height,
        fill: fill,
        strokeOpacity: 0
      }
    });
    bgGroup.addShape('path', {
      attrs: Util.mix({
        path: path
      }, this.get('lineStyle'))
    });
    bgGroup.move(0, titleGap);
  };

  return Color;
}(Continuous);

module.exports = Color;
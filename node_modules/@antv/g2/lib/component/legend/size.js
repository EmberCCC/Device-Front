function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview The class of the size legend
 * @author sima.zhang
 * @author ye liu
 */
var Util = require('../../util');

var Global = require('../../global');

var Continuous = require('./continuous');

var SLIDER_HEIGHT = 2;
var CIRCLE_GAP = 8;
var MAX_SIZE = 15;
var MIN_SIZE = 5;

var Size =
/*#__PURE__*/
function (_Continuous) {
  _inheritsLoose(Size, _Continuous);

  function Size() {
    return _Continuous.apply(this, arguments) || this;
  }

  var _proto = Size.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    var cfg = _Continuous.prototype.getDefaultCfg.call(this);

    return Util.mix({}, cfg, {
      /**
       * 类型
       * @type {String}
       */
      type: 'size-legend',
      width: 100,
      height: 200,
      _circleStyle: {
        stroke: '#4E7CCC',
        fill: '#fff',
        fillOpacity: 0
      },
      textStyle: {
        fill: '#333',
        textAlign: 'start',
        textBaseline: 'middle',
        fontFamily: Global.fontFamily
      },
      inRange: {
        fill: 'white',
        stroke: '#5d7ca3',
        lineWidth: 2
      },
      inRangeSlider: {
        fill: '#5d7ca3'
      },
      backgroundCircle: {
        stroke: '#ccc',
        fill: 'white',
        lineWidth: 2
      }
    });
  };

  _proto._renderSliderShape = function _renderSliderShape() {
    var minRadius = MIN_SIZE;
    var maxRadius = MAX_SIZE;
    var slider = this.get('slider');
    var backgroundElement = slider.get('backgroundElement');
    var layout = this.get('layout');
    var width = layout === 'vertical' ? SLIDER_HEIGHT : this.get('width');
    var height = layout === 'vertical' ? this.get('height') : SLIDER_HEIGHT;
    var x = minRadius;
    var y = this.get('height') / 2;
    var inRangeSlider = this.get('inRangeSlider');
    var points = layout === 'vertical' ? [[0, maxRadius], [width, maxRadius], [width, height - minRadius], [0, height - minRadius]] : [[x, y + height], [x, y], [x + width - maxRadius - 4, y], [x + width - maxRadius - 4, y + height]]; // add background circle

    var backCircleStyle = this.get('backgroundCircle');
    backgroundElement.addShape('circle', {
      attrs: Util.mix({
        x: layout === 'vertical' ? width / 2 : 0,
        y: layout === 'vertical' ? 0 : y,
        r: layout === 'vertical' ? maxRadius : minRadius
      }, backCircleStyle)
    });
    backgroundElement.addShape('circle', {
      attrs: Util.mix({
        x: width,
        y: layout === 'vertical' ? height : y,
        r: layout === 'vertical' ? minRadius : maxRadius
      }, backCircleStyle)
    });
    return this._addBackground(backgroundElement, 'Polygon', Util.mix({
      points: points
    }, inRangeSlider));
  };

  _proto._addHorizontalTrigger = function _addHorizontalTrigger(type, blockAttr, textAttr, radius) {
    var slider = this.get('slider');
    var trigger = slider.get(type + 'HandleElement');
    var y = -this.get('height') / 2;
    var button = trigger.addShape('circle', {
      attrs: Util.mix({
        x: 0,
        y: y,
        r: radius
      }, blockAttr)
    });
    var text = trigger.addShape('text', {
      attrs: Util.mix(textAttr, {
        x: 0,
        y: y + radius + 10,
        textAlign: 'center',
        textBaseline: 'middle'
      })
    });
    var layout = this.get('layout');
    var trigerCursor = layout === 'vertical' ? 'ns-resize' : 'ew-resize';
    button.attr('cursor', trigerCursor);
    text.attr('cursor', trigerCursor);
    this.set(type + 'ButtonElement', button);
    this.set(type + 'TextElement', text);
  };

  _proto._addVerticalTrigger = function _addVerticalTrigger(type, blockAttr, textAttr, radius) {
    var slider = this.get('slider');
    var trigger = slider.get(type + 'HandleElement');
    var button = trigger.addShape('circle', {
      attrs: Util.mix({
        x: -6,
        y: 0,
        r: radius
      }, blockAttr)
    });
    var text = trigger.addShape('text', {
      attrs: Util.mix(textAttr, {
        x: radius + 10,
        y: 0,
        textAlign: 'start',
        textBaseline: 'middle'
      })
    });
    var layout = this.get('layout');
    var trigerCursor = layout === 'vertical' ? 'ns-resize' : 'ew-resize';
    button.attr('cursor', trigerCursor);
    text.attr('cursor', trigerCursor);
    this.set(type + 'ButtonElement', button);
    this.set(type + 'TextElement', text);
  };

  _proto._renderTrigger = function _renderTrigger() {
    var min = this.get('firstItem');
    var max = this.get('lastItem');
    var layout = this.get('layout');
    var textStyle = this.get('textStyle');
    var inRange = this.get('inRange');
    var minBlockAttr = Util.mix({}, inRange);
    var maxBlockAttr = Util.mix({}, inRange);
    var minRadius = MIN_SIZE;
    var maxRadius = MAX_SIZE;
    var minTextAttr = Util.mix({
      text: this._formatItemValue(min.value) + ''
    }, textStyle);
    var maxTextAttr = Util.mix({
      text: this._formatItemValue(max.value) + ''
    }, textStyle);

    if (layout === 'vertical') {
      this._addVerticalTrigger('min', minBlockAttr, minTextAttr, minRadius);

      this._addVerticalTrigger('max', maxBlockAttr, maxTextAttr, maxRadius);
    } else {
      this._addHorizontalTrigger('min', minBlockAttr, minTextAttr, minRadius);

      this._addHorizontalTrigger('max', maxBlockAttr, maxTextAttr, maxRadius);
    }
  };

  _proto._bindUI = function _bindUI() {
    var self = this;

    if (self.get('slidable')) {
      var slider = self.get('slider');
      slider.on('sliderchange', function (ev) {
        var range = ev.range;
        var firstItemValue = self.get('firstItem').value * 1;
        var lastItemValue = self.get('lastItem').value * 1;
        var minValue = firstItemValue + range[0] / 100 * (lastItemValue - firstItemValue);
        var maxValue = firstItemValue + range[1] / 100 * (lastItemValue - firstItemValue);
        var minRadius = MIN_SIZE + range[0] / 100 * (MAX_SIZE - MIN_SIZE);
        var maxRadius = MIN_SIZE + range[1] / 100 * (MAX_SIZE - MIN_SIZE);

        self._updateElement(minValue, maxValue, minRadius, maxRadius);

        var itemFiltered = new Event('itemfilter', ev, true, true);
        itemFiltered.range = [minValue, maxValue];
        self.emit('itemfilter', itemFiltered);
      });
    }
  };

  _proto._updateElement = function _updateElement(min, max, minR, maxR) {
    var minTextElement = this.get('minTextElement');
    var maxTextElement = this.get('maxTextElement');
    var minCircleElement = this.get('minButtonElement');
    var maxCircleElement = this.get('maxButtonElement');

    if (max > 1) {
      // 对于大于 1 的值，默认显示为整数
      min = parseInt(min, 10);
      max = parseInt(max, 10);
    }

    minTextElement.attr('text', this._formatItemValue(min) + '');
    maxTextElement.attr('text', this._formatItemValue(max) + '');
    minCircleElement.attr('r', minR);
    maxCircleElement.attr('r', maxR);
    var layout = this.get('layout');

    if (layout === 'vertical') {
      minTextElement.attr('x', minR + 10);
      maxTextElement.attr('x', maxR + 10);
    } else {
      var y = -this.get('height') / 2;
      minTextElement.attr('y', y + minR + 10);
      maxTextElement.attr('y', y + maxR + 10);
    }
  }; // not slidable


  _proto._addCircle = function _addCircle(x, y, r, text, maxWidth) {
    var group = this.addGroup();
    var circleStyle = this.get('_circleStyle');
    var textStyle = this.get('textStyle');
    var titleShape = this.get('titleShape');
    var titleGap = this.get('titleGap');

    if (titleShape) {
      titleGap += titleShape.getBBox().height;
    }

    group.addShape('circle', {
      attrs: Util.mix({
        x: x,
        y: y + titleGap,
        r: r === 0 ? 1 : r
      }, circleStyle)
    });
    group.addShape('text', {
      attrs: Util.mix({
        x: maxWidth + 5,
        y: y + titleGap,
        text: text === 0 ? '0' : text
      }, textStyle)
    });
  };

  _proto._renderBackground = function _renderBackground() {
    var self = this;
    var minRadius = this.get('firstItem').attrValue * 1;
    var maxRadius = this.get('lastItem').attrValue * 1;
    var medianRadius = (minRadius + maxRadius) / 2;

    self._addCircle(maxRadius, maxRadius, maxRadius, medianRadius, 2 * maxRadius);

    self._addCircle(maxRadius, maxRadius * 2 + CIRCLE_GAP + medianRadius, medianRadius, (minRadius + medianRadius) / 2, 2 * maxRadius);

    self._addCircle(maxRadius, (maxRadius + CIRCLE_GAP + medianRadius) * 2 + minRadius, minRadius, minRadius, 2 * maxRadius);
  };

  return Size;
}(Continuous);

module.exports = Size;
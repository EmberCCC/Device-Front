function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * @fileOverview The base class of legend
 * @author sima.zhang
 */
var Util = require('../../util');

var _require = require('../../renderer'),
    Group = _require.Group;

var Global = require('../../global');

var Base =
/*#__PURE__*/
function (_Group) {
  _inheritsLoose(Base, _Group);

  function Base() {
    return _Group.apply(this, arguments) || this;
  }

  var _proto = Base.prototype;

  _proto.getDefaultCfg = function getDefaultCfg() {
    return {
      /**
       * 图例标题配置
       * @type {Object}
       */
      title: {
        fill: '#333',
        textBaseline: 'middle'
      },

      /**
       * 图例项文本格式化
       * @type {Function}
       */
      itemFormatter: null,

      /**
       * 是否使用 html 进行渲染
       * @type {Boolean}
       */
      useHtml: false,

      /**
       * useHtml 为 true 时生效，用于自动定位
       * @type {[type]}
       */
      autoPosition: true,

      /**
       * 图例是否绘制在绘图区域内
       * @type {Boolean}
       */
      inPlot: false,

      /**
       * 鼠标 hover 到图例上的默认交互是否开启
       * @type {Boolean}
       */
      hoverable: true
    };
  };

  _proto._beforeRenderUI = function _beforeRenderUI() {
    var group = this.addGroup();
    group.set('viewId', this.get('viewId'));
    this.set('itemsGroup', group);
  };

  _proto._renderUI = function _renderUI() {
    this._renderTitle();
  };

  _proto._renderTitle = function _renderTitle() {
    var title = this.get('title');
    var viewTheme = this.get('viewTheme') || Global;

    if (title && title.text) {
      var titleShape = this.addShape('text', {
        attrs: Util.mix({
          x: 0,
          y: 0,
          fill: '#333',
          // 默认样式
          textBaseline: 'middle',
          fontFamily: viewTheme.fontFamily
        }, title)
      });
      titleShape.name = 'legend-title';
      this.get('appendInfo') && titleShape.setSilent('appendInfo', this.get('appendInfo'));
      this.set('titleShape', titleShape);
    }
  };

  _proto.getCheckedCount = function getCheckedCount() {
    var itemsGroup = this.get('itemsGroup');
    var items = itemsGroup.get('children');
    var checkedArr = Util.filter(items, function (item) {
      return item.get('checked');
    });
    return checkedArr.length;
  };

  _proto.setItems = function setItems(items) {
    this.set('items', items);
    this.clearItems();

    this._renderUI();
  };

  _proto.addItem = function addItem(item) {
    var items = this.get('items');
    items.push(item);
    this.clearItems();

    this._renderUI();
  };

  _proto.clearItems = function clearItems() {
    var itemsGroup = this.get('itemsGroup');
    itemsGroup.clear();
  };

  _proto.getWidth = function getWidth() {
    var bbox = this.getBBox();
    return bbox.width;
  };

  _proto.getHeight = function getHeight() {
    var bbox = this.getBBox();
    return bbox.height;
  };

  return Base;
}(Group);

module.exports = Base;
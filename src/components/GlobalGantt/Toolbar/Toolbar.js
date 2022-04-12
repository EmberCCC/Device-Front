import React, { Component } from 'react';
export default class Toolbar extends Component {
  handleZoomChange = (e) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(e.target.value)
    }
  }
  render() {
    const zoomRadios = ['小时', '天','周', '月',].map((value) => {
      const isActive = this.props.zoom === value;
      return (
        <label key={ value } className={ `radio-label ${isActive ? 'radio-label-active': ''}` }>
          <input type='radio'
            checked={ isActive }
            onChange={ this.handleZoomChange }
            value={ value }/>
          { value }
        </label>
      );
    });

    return (
      <div className="tool-bar">
        <b> 展示标准：</b>
          { zoomRadios }
      </div>
    );
  }
}

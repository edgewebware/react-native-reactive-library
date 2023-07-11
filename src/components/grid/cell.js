import {View} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {spacingStyle} from 'react-native-reactive-library/src/styles/general/block'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {get} from 'react-native-reactive-library/src/settings'

const defaults = get.defaults()

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }

  // returns styles to set cell size
  cellSize(size, direction) {
    direction = direction ? direction : 'x'
    let style = {}

    switch (size) {
      case "auto":
        size = null
        style.flex = 0
        style.flexGrow = 1
        break;
      case "shrink":
        size = null
        style.flex = 0
        style.flexShrink = 1
        break;
      default:
        if (size > 0) {
          size = (100/defaults.gridSize*size)+"%"
        } else {
          size = "100%"
        }
    }

    switch (direction) {
      case 'x':
        style.width = size
        style.height = 'auto'
        break;
      case 'y':
        style.height = size
        style.width = '100%'
        break;
      default:
        style.width = size
        style.height = 'auto'
    }
    return style
  }

  static propTypes = {
    direction: propShapes.oneOf(['x', 'y']),
    margin: propShapes.oneOf(optionsByKey(shared.margin, ['none'])),
    padding: propShapes.oneOf(optionsByKey(shared.padding, ['none'])),
    align: propShapes.oneOf(optionsByKey(shared.alignSelf, ['inherit'])),
    format: propShapes.string(),
    inherit: propShapes.bool(),
    size: () => null
  }

  render() {
    const {
      direction,
      margin,
      padding,
      size,
      inherit,
      format,
      align: alignSelf,
      ...rest
    } = this.props

    let styles = shared

    this.format = Props.getFormat(format, 'cell')

    this.size = size ? Props.getBySize(size) : defaults.gridSize

    this.styles = Props.getStyles({
      alignSelf,
      padding,
      margin,
    }, styles, this.format, inherit)

    return (
      <View style={[
          this.cellSize(this.size, direction),
          ...this.styles,
          this.props.style
        ]}>
        {this.props.children}
      </View>
    )
  }
}

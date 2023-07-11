import {
    View,
    Text,
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'

export default class Grid extends Component {
  constructor(props) {
    super(props);
  }

  renderChildren (props) {
    return React.Children.map(this.props.children, (child) => {
      if (child) {
        return React.cloneElement(child, {...props, ...child.props})
      } else {
        return null;
      }
    })
  }

  static propTypes = {
    direction: propShapes.oneOf(['x', 'y']),
    wrap: propShapes.bool(),
    inherit: propShapes.bool(),
    format: propShapes.string(),
    size: () => null
  }

  render() {

    const {
      wrap,
      margin,
      padding,
      inherit,
      direction,
      format,
      style,
      ...rest
    } = this.props

    this.format = Props.getFormat(format, `grid${direction}`)

    this.cellProps = Props.pass({
      margin,
      padding,
    }, this.format, inherit)

    this.wrapState = (wrap == undefined || wrap) ? 'wrap' : 'nowrap'

    return (
        <View
          style={[
            {
              flexWrap: this.wrapState
            },
            style
          ]}
        >
          {this.renderChildren({direction, ...this.cellProps})}
        </View>
    )
  }
}

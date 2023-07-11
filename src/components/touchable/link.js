import {
  TouchableHighlight,
  StyleSheet,
  Linking,
  View,
} from 'react-native'
import React, {Component} from 'react'
import Text from '../text/text'
import Props, {propShapes} from 'react-native-reactive-library/src/lib/prop'

export default class Link extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    url: propShapes.string(),
    format: propShapes.string(),
    inherit: propShapes.bool(),
  }

  render() {
    const {url, style, children, inherit, color, spacing, weight, size, align, fontFamily, format, lineHeight, ...rest} = this.props

    this.format = Props.getFormat(format, 'link')

    let textProps = Props.pass({
      color,
      spacing,
      weight,
      align,
      fontFamily,
      size,
      lineHeight,
    }, this.format, inherit)

    return (
          <Text
            onPress={() => Linking.openURL(url)}
            {...textProps}
            {...rest}
            style={style}
          >
            {children}
          </Text>
    );
  }
}

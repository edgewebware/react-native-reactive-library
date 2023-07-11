import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {convertToRoman, convertToLetter} from 'react-native-reactive-library/src/lib/helpers'

export default class FList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    type: propShapes.oneOf(['roman', 'ROMAN', 'numeric', 'letter', 'LETTER', 'unordered', 'custom']),
    format: propShapes.string(),
    inherit: propShapes.bool(),
  }

  renderItems(items, style, props) {
    let i = 0
    return React.Children.map(items, (item) => {
      i++

      props = {...props, ...item.props}

      switch (props.type) {
        case 'numeric':
          props.label = i+'.'
          break;
        case 'roman':
          props.label = convertToRoman(i)+'.'
          break;
        case 'ROMAN':
          props.label = (convertToRoman(i)+'.').toUpperCase();
          break;
        case 'letter':
          props.label = convertToLetter(i)+'.'
          break;
        case 'LETTER':
          props.label = (convertToLetter(i)+'.').toUpperCase();
          break;
        case 'unordered':
          props.label = '\u2022'
          break;
        case 'custom':
          break;
      }

      props.depth = this.props.depth ? this.props.depth : 0

      props.style = [style, item.props.style]

      return React.cloneElement(item, props)
    })
  }

  render() {
    const {
      format,
      children,
      labelStyle,
      color,
      weight,
      fontFamily,
      size,
      width,
      style,
      inherit,
      spacing,
      lineHeight,
      ...rest
    } = this.props

    this.format = Props.getFormat(format, 'list')

    type = this.props.type ? this.props.type : 'unordered'

    let labelProps = Props.pass({
      color,
      weight,
      fontFamily,
      size,
      type,
      width,
      lineHeight,
      spacing,
    }, this.format, inherit)

    return (
      <View style={[
        {
          flexDirection: 'column',
        },
        style
      ]}
      {...rest}
      >
        {this.renderItems(children, labelStyle, labelProps)}
      </View>
    )
  }
}

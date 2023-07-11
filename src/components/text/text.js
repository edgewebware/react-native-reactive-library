import {
  Text,
  StyleSheet
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {text} from 'react-native-reactive-library/src/styles/components/text'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'

export default class FText extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    color: propShapes.string(),
    weight: propShapes.oneOf(optionsByKey(text.weight, ['inherit'])),
    align: propShapes.oneOf(optionsByKey(text.align, ['inherit'])),
    fontFamily: propShapes.oneOf(optionsByKey(text.fontFamily, ['inherit'])),
    size: propShapes.oneOf(optionsByKey(text.size, ['inherit'])),
    spacing: propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
    format: propShapes.string(),
    inherit: propShapes.bool(),
  }

  renderChildren() {
    const {children, inherit, style, ...rest} = this.props
    if (typeof children !== 'string') {
      return React.Children.map(children, (child) => {
        if (child !== null && typeof child === 'object') {
          const props = {...rest, ...child.props}
          return React.cloneElement(child, props)
        } else {
          return child
        }
      })
    }

    return children
  }

  render() {

    const {color, weight, family, size, spacing, children, align, style, inherit, lineHeight, fontStyle, format, ...rest} = this.props

    let styles = {...text, ...shared}

    this.format = Props.getFormat(format, 'text')

    this.stylesObj = Props.getStylesObj({
      weight,
      family,
      size,
      spacing,
      align,
      color,
      fontStyle,
    }, styles, this.format, false)

    this.styles = [
      ...Object.values(this.stylesObj),
      Props.getLineHeight(lineHeight, [this.stylesObj.size, style], this.format, inherit),
      style
    ]
    let x = Props.getLineHeight(lineHeight, [this.stylesObj.size, style], this.format, inherit)

    return (
      <Text
        {...rest}
        style={[
          ...this.styles,
        ]}
      >
        {this.renderChildren()}
      </Text>
    );
  }
}

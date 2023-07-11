import {
  View,
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {block} from 'react-native-reactive-library/src/styles/components/block'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {Text} from 'react-native-reactive-library'

export default class BlockText extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    size: propShapes.oneOf(optionsByKey(block.size, ['inherit'])),
    width: propShapes.oneOf(optionsByKey(shared.width, ['inherit'])),
    spacing: propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
    rounding: propShapes.oneOf(optionsByKey(shared.rounding, ['inherit'])),
    padding: propShapes.oneOf(optionsByKey(shared.padding, ['inherit'])),
    backgroundColor: propShapes.string(),
    borderColor: propShapes.string(),
    borderWidth: propShapes.number(),
    format: propShapes.string(),
    inherit: propShapes.bool(),
  }

  render() {
    let backgroundImage
    if (this.props.backgroundImage) {
      backgroundImage = (
        <Image
          source={this.props.backgroundImage}
          style={shared.style.backgroundImage}
        />
      )
    }

    const {color, size, fontFamily, align, weight, backgroundColor, width, spacing, rounding, borderWidth, borderColor, padding, format, icon, label, inherit, style, ...rest} = this.props

    let styles   = {...block, ...shared},
        textSize = size

    this.format = Props.getFormat(format, 'blockText')

    this.styles = Props.getStyles({
      borderWidth,
      borderColor,
      rounding,
      size,
      width,
      spacing,
      padding,
      size,
      backgroundColor
    }, styles, this.format, inherit)

    this.textStyle = Props.getStyles({
      textSize,
    }, styles, this.format, inherit, false)

    this.textProps = Props.pass({
      color,
      fontFamily,
      align,
      weight
    }, this.format, inherit)

    return (
      <View {...this.props}
        style={[
          shared.styles.wrapper,
          ...this.styles,
          style
        ]}
        {...rest}
      >
        <Text
          style={[
            ...this.textStyle,
          ]}
          {...this.textProps}
        >
          {this.props.children}
        </Text>
        {backgroundImage}
      </View>
    );
  }
}

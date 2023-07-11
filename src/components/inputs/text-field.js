import {
  TextInput,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {input} from 'react-native-reactive-library/src/styles/components/input'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {GridX, Cell} from 'react-native-reactive-library'
import {get} from 'react-native-reactive-library/src/settings'

const colors = get.colors()

export default class TextField extends Component {
  constructor(props) {
    super(props);
  }


  static propTypes = {
    rounding: propShapes.oneOf(optionsByKey(shared.rounding)),
    size: propShapes.oneOf(optionsByKey(input.size)),
    spacing: propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
    width: propShapes.oneOf(optionsByKey(shared.width, ['inherit'])),
    padding: propShapes.oneOf(optionsByKey(shared.padding, ['inherit'])),
    backgroundColor: propShapes.string(),
    borderColor: propShapes.string(),
    borderWidth: propShapes.number(),
    format: propShapes.string(),
    inherit: propShapes.bool(),
  }

  focus() {
    this.input.focus();
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

    const {color, size, fontFamily, align, weight, backgroundColor, width, spacing, rounding, borderWidth, borderColor, padding, format, value, inherit, style, placeholderTextColor, ...rest} = this.props

    let styles   = {...input, ...shared},
        textSize = size

    this.format = Props.getFormat(format, 'textField')
    this.format.alignSelf = this.format.align
    this.format.textSize = this.format.size

    this.styles = Props.getStyles({
      borderWidth,
      borderColor,
      rounding,
      width,
      spacing,
      padding,
      size,
      backgroundColor
    }, styles, this.format, inherit)

    this.wrapperStyles = Props.getStyles({
      alignSelf: align
    }, styles, this.format, inherit)

    this.textStyle = Props.getStyles({
      textSize,
        color,
        fontFamily,
        align,
        weight,
    }, styles, this.format, inherit)

    return (
      <TouchableOpacity onPress={() => this.input.focus()}>
        <GridX vAlign="middle" style={[
              shared.styles.wrapper,
              ...this.styles,
              style,
            ]}
            wrap={false}>
          <Cell size={this.props.icon ? 10 : 12}>
            <TextInput {...rest} ref={(input) => { this.input = input }} style={[this.textStyle, style]} />
          </Cell>
          {this.props.icon && (<Cell size="2">
            {this.props.icon}
          </Cell>)}
        </GridX>

        {this.props.errorMessage && (
          <Text style={{color: colors.error, marginBottom: 10}}>{this.props.errorMessage}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {Text} from 'react-native-reactive-library'
import {button} from 'react-native-reactive-library/src/styles/components/button'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {GridX, Cell} from 'react-native-reactive-library'

export default class FButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    rounding: propShapes.oneOf(optionsByKey(shared.rounding)),
    size: propShapes.oneOf(optionsByKey(button.size)),
    spacing: propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
    width: propShapes.oneOf(optionsByKey(shared.width, ['inherit'])),
    padding: propShapes.oneOf(optionsByKey(shared.padding, ['inherit'])),
    backgroundColor: propShapes.string(),
    borderColor: propShapes.string(),
    borderWidth: propShapes.number(),
    format: propShapes.string(),
    inherit: propShapes.bool(),
  }
  // returns button title
  renderTitle(title) {
    if (typeof title == 'string') {
      return (
        <Text
          style={[
            ...this.textStyle
          ]}
          {...this.textProps}
        >
          {title}
        </Text>
      )
    } else {
      let titleProps = {...title.props},
          lineHeight = null
      titleProps.style = [this.wrapperStyles, titleProps.style]

      const children = this.renderChildren(title)

      return React.cloneElement(title, {...titleProps, children})
    }
  }

  renderChildren(parent) {
    return React.Children.map(parent.props.children, (child) => {
      if (typeof child == 'string') {
        return (
          <Text
            style={[
              ...this.textStyle
            ]}
            {...this.textProps}
          >
            {child}
          </Text>
        )
      } else {
        let output = [],
            name = child.type.displayName ? child.type.displayName : child.type.name,
            props = {...child.props},
            textStyle = StyleSheet.flatten(this.textStyle)
        // component is a form of text
        if (name == 'FText' || name == 'Text' || name == 'Icon') {
          if (props.scale) {
              textStyle.fontSize = textStyle.fontSize*child.props.scale
              textStyle.lineHeight = textStyle.height = textStyle.fontSize
          } else {
            textStyle.lineHeight = textStyle.fontSize
          }

          if (name == 'Icon') {
            props.style = {...props.style, ...textStyle}

            output = (<Text {...this.textProps} style={textStyle}>{React.cloneElement(child, props)}</Text>)
          } else {
              props = {...props, ...this.textProps}
              props.style = {...textStyle, ...props.style}

            if (name == 'Text') {
              output = (<Text {...props}>{React.cloneElement(child, props)}</Text>)
            } else {
              output = React.cloneElement(child, props)
            }
          }
        // block components
        } else {
          props = {...props, children: this.renderChildren(child)}
          output = React.cloneElement(child, props)
        }

        return output
      }
    })
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

    const {color, size, fontFamily, align, weight, backgroundColor, width, spacing, rounding, borderWidth, borderColor, padding, format, title, inherit, style, loading, disabled, ...rest} = this.props

    let styles   = {...button, ...shared},
        textSize = size,
        textIgnore = Text.ignoreStyles

    this.format = Props.getFormat(format, 'button')
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
    }, styles, this.format, inherit, false)

    this.textProps = Props.pass({
      color,
      fontFamily,
      align,
      weight
    }, this.format, inherit)

    const activeBackground = Props.activeBackground(...[this.styles, style])

    let indicator = loading ? (
          <Cell size="shrink">
            <ActivityIndicator size="small" color={this.textProps.color} style={{marginLeft: 5}} />
          </Cell>
        ) : ''

    if (Platform.OS == 'ios') {
      return (
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor={activeBackground.ios}
          disabled={disabled||loading}
          {...rest}
          style={[
            {opacity: disabled||loading ? 0.8 : 1},
            shared.styles.wrapper,
            ...this.styles,
            style,
          ]}
        >
          <GridX vAlign="middle">
            <Cell size="auto">
              {this.renderTitle(title)}
            </Cell>
            {indicator}
          </GridX>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableNativeFeedback
          {...rest}
          background={TouchableNativeFeedback.Ripple(activeBackground.android)}
          disabled={disabled||loading}
        >
          <View
            style={[
              {opacity: disabled||loading ? 0.8 : 1},
              shared.styles.wrapper,
              ...this.styles,
              style,
            ]}
            {...rest}
          >
            {this.renderTitle(title)}
          </View>
        </TouchableNativeFeedback>
      )
    }
  }
}

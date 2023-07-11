import {
    View,
    StyleSheet,
} from 'react-native'
import React, {Component} from 'react'
import {GridX, Cell, Text} from 'react-native-reactive-library'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {text} from 'react-native-reactive-library/src/styles/components/text'

export default class FListItem extends Component {
  constructor(props) {
    super(props);
  }

  renderLabel (label, listStyles, labelProps, depth) {
    const labels = ['solid', 'hollow', 'square']
    switch (labelProps.type) {
      case "unordered":
        return (<View {...labelProps} style={[listStyles.label]}><View style={[listStyles.bullet, listStyles[labels[depth % 3]]]}></View></View>)
        break;
      case "custom":
        return (<View {...labelProps} style={[listStyles.label]}></View>)
        break;
      default:
        return (<View style={[listStyles.label]}><Text numberOfLines={1} {...labelProps} style={listStyles.text}>{label}</Text></View>)
        break;
    }
  }

  renderChildren (children, type, textProps, depth) {
    return React.Children.map(children, (child) => {
      let props = {...child.props, ...textProps}
      if (typeof child !== 'string') {
        if (child.type.name == 'FList') {
          props.depth = props.depth ? props.depth : depth + 1
          props.type = props.type ? props.type : type
        } else if (child.type.name == 'FText') {
          props = props
        }
      }
      return React.cloneElement(child, props)
    })
  }

  static propTypes = {
    type: propShapes.oneOf(['roman', 'ROMAN', 'numeric', 'letter', 'LETTER', 'unordered', 'custom']),
    spacing: propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
    width: propShapes.number(),
    inherit: propShapes.bool(),
    format: propShapes.string(),
  }

  render() {
    const {
      format,
      type,
      label,
      style,
      inherit,
      color,
      weight,
      width,
      fontFamily,
      size,
      spacing,
      lineHeight,
      children,
      depth,
      ...rest
    } = this.props

    this.format = {...Props.getFormat(format, 'text'), ...Props.getFormat(format, 'list')}

    let styles = shared,
        textProps = Props.pass({
          color,
          fontFamily,
          lineHeight,
          size
        }, this.format, inherit),
        labelProps = Props.pass({
          color,
          weight,
          fontFamily,
          type,
          style,
          lineHeight
        }, this.format, inherit)

    this.font = Props.getStyles({
      size,
      color,
    }, text, this.format)

    this.styles = Props.getStyles({
      spacing,
    }, shared, this.format)

    let {fontSize, color: labelColor} = {
      ...StyleSheet.flatten(style),
      ...StyleSheet.flatten(this.font),
    }

    switch (labelProps.type) {
      case "custom":
        this.width = width ? width : 0
        padding = 0
        break;
      default:
        this.width = width ? width : fontSize * 2.5
        padding = 0
    }

    const listStyles = StyleSheet.create({
      bullet: {
        width: fontSize * 0.5,
        height: fontSize * 0.5,
        borderWidth: fontSize/12,
        marginTop: fontSize/3,
        marginRight: fontSize * 0.6,
        borderColor: labelColor,
        alignSelf: 'flex-end'
      },
      label: {
        width: this.width,
        flex: 0,
      },
      text: {
        position: 'absolute',
        width: this.width*5,
        right: 0,
        paddingRight: fontSize * 0.5,
        textAlign: 'right'
      },
      content: {
        flex: 1,
        paddingLeft: padding,
      },
      child: {
        paddingLeft: this.width * 0.05,
      },
      solid: {
        backgroundColor: labelColor,
        borderRadius: fontSize * 0.25,
      },
      hollow: {
        borderRadius: fontSize * 0.25,
      },
      square: {
        backgroundColor: labelColor,
      },
    })

    return (
      <View style={[{flexDirection: 'row'}, ...this.styles, (depth > 0 ? listStyles.child : null), style]}>
        {this.renderLabel(label, listStyles, labelProps, depth)}
        <View style={[listStyles.content]}>{this.renderChildren(children, type, textProps, depth)}</View>
      </View>
    )
  }
}

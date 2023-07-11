import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Animated,
  Easing,
  View,
} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {block} from 'react-native-reactive-library/src/styles/components/block'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {GridX, Cell, Text} from 'react-native-reactive-library'

export default class Accordion extends Component {
  constructor(props) {
    super(props)
    this.toggleContent = this.toggleContent.bind(this)
  }

  componentDidMount () {
    this.toggleAnimations()
  }

  componentDidUpdate () {
    this.toggleAnimations()
  }

  toggleContent() {
    if (typeof this.props.onExpand === 'function') {
      this.props.onExpand(this.props.childId)
    }
  }

  static propTypes = {
    size            : propShapes.oneOf(optionsByKey(block.size, ['inherit'])),
    width           : propShapes.oneOf(optionsByKey(shared.width, ['inherit'])),
    spacing         : propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
    rounding        : propShapes.oneOf(optionsByKey(shared.rounding, ['inherit'])),
    padding         : propShapes.oneOf(optionsByKey(shared.padding, ['inherit'])),
    backgroundColor : propShapes.string(),
    borderColor     : propShapes.string(),
    fontFamily      : propShapes.string(),
    borderWidth     : propShapes.number(),
    format          : propShapes.string(),
    inherit         : propShapes.bool(),
  }

  static availableProps = [
    'borderWidth',
    'borderColor',
    'rounding',
    'size',
    'width',
    'spacing',
    'padding',
    'backgroundColor',
    'color',
    'fontFamily',
    'align',
    'weight',
    'lineHeight',
    'inherit',
    'format',
    'activeSize',
    'activeWidth',
    'activeSpacing',
    'activeRounding',
    'activePadding',
    'activeBackgroundColor',
    'activeBorderColor',
    'activeBorderWidth',
    'activeFontFamily'
  ]

  animations = {
    rotation: new Animated.Value(0)
  }

  renderChildren() {
    return this.props.expanded ? this.props.children : null
  }

  toggleAnimations () {
    if (this.props.loaded) {
      this.animations.rotation.setValue(0);
      Animated.timing(
        this.animations.rotation,
        {
          toValue: 360,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ).start()
    } else {
      this.animations.rotation.setValue(360);
    }
  }

  renderLabel() {
    const {icon} = this.props
    if (icon) {
      this.icon = React.cloneElement(icon, {style: [icon.props.style, ...this.textStyle]})
    }

    this.iconRotate = this.animations.rotation.interpolate({
      inputRange:  [0, 360],
      outputRange: [`${this.props.expanded ? this.rotation.closed : this.rotation.expanded}deg`, `${this.props.expanded ? this.rotation.expanded : this.rotation.closed}deg`]
    })

    if (!this.iconRotate) {
      this.iconRotate = (this.props.expanded ? this.rotation.expanded : this.rotation.closed) + 'deg'
    }

    return (
        <GridX>
          <Cell size="auto">
            <Text {...this.textProps} style={[...this.textStyle]}>{this.props.label}</Text>
          </Cell>
          <Cell size="shrink">
            <Animated.View style={{
                transform: [
                  {rotate: this.iconRotate}
                ],
              }}>
              <Text {...this.textProps}
                style={[
                  ...this.textStyle
                ]}
                >
                {this.icon}
              </Text>
            </Animated.View>
          </Cell>
        </GridX>
    )
  }

  render() {
    const {format, icon, label, inherit, style, rotation, onPress, ...props} = this.props

    let styles   = {...block, ...shared},
        textSize = props.size

    this.onPress = () => {
      this.toggleContent()
    }

    this.rotation = {expanded: 90, closed: 0, ...rotation}
    this.format   = Props.getFormat(format, 'accordion')

    let styleProps = {
      borderWidth     : props.borderWidth,
      borderColor     : props.borderColor,
      rounding        : props.rounding,
      size            : props.size,
      width           : props.width,
      spacing         : props.spacing,
      padding         : props.padding,
      backgroundColor : props.backgroundColor
    },
    textProps = {
      color      : props.color,
      fontFamily : props.fontFamily,
      align      : props.align,
      weight     : props.weight,
      lineHeight : props.lineHeight
    }

    if (this.props.expanded) {
      const activeStyleProps = Props.getActive(styleProps, props, this.format),
            activeTextProps  = Props.getActive(textProps, props, this.format)

      this.styles    = Props.getStyles(activeStyleProps, styles, this.format, inherit)
      this.textProps = Props.pass(activeTextProps, this.format, inherit)

    } else {
      this.styles    = Props.getStyles(styleProps, styles, this.format, inherit)
      this.textProps = Props.pass(textProps, this.format, inherit)
    }

    this.textStyle = Props.getStyles({textSize}, styles, this.format, inherit, false)

    activeBackground = Props.activeBackground(...[this.styles, style])

    if (Platform.OS == 'ios') {
      return (
        <View>
          <TouchableHighlight
            activeOpacity={0.8}
            onPress={this.onPress}
            underlayColor={activeBackground.ios}
            style={[
              block.styles.container,
              ...this.styles,
            ]}
            >
            {this.renderLabel()}
          </TouchableHighlight>
          {this.renderChildren()}
        </View>
      );
    } else {
      return (
        <View>
          <TouchableNativeFeedback
            onPress={this.onPress}
            background={TouchableNativeFeedback.Ripple(activeBackground.android)}
            >
            <View
              style={[
                block.styles.container,
                ...this.styles,
              ]}
              >
              {this.renderLabel()}
            </View>
          </TouchableNativeFeedback>
          {this.renderChildren()}
        </View>
      )
    }
  }
}

Accordion.displayName = 'Accordion'


// adding active props validation
Accordion.propTypes = {
  ...Accordion.propTypes,
  activeSize            : Accordion.propTypes.size,
  activeWidth           : Accordion.propTypes.width,
  activeSpacing         : Accordion.propTypes.spacing,
  activeRounding        : Accordion.propTypes.rounding,
  activePadding         : Accordion.propTypes.padding,
  activeBackgroundColor : Accordion.propTypes.backgroundColor,
  activeBorderColor     : Accordion.propTypes.borderColor,
  activeBorderWidth     : Accordion.propTypes.borderWidth,
  activeFontFamily      : Accordion.propTypes.fontFamily
}

import {View} from 'react-native'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {container} from 'react-native-reactive-library/src/styles/components/container'
import {renameProp} from 'react-native-reactive-library/src/lib/helpers'

export default class Container extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    hAlign: propShapes.oneOf(optionsByKey(shared.alignColX, ['inherit'])),
    vAlign: propShapes.oneOf(optionsByKey(shared.alignColY, ['inherit'])),
    margin: propShapes.oneOf(optionsByKey(shared.margin, ['none'])),
    padding: propShapes.oneOf(optionsByKey(shared.padding, ['none'])),
    format: propShapes.string(),
    inherit: propShapes.bool(),
    fitParent: propShapes.bool(),
  }

  render() {
    const {
      format,
      hAlign,
      vAlign,
      margin,
      padding,
      fitParent,
      inherit,
      size,
      style,
      ...rest
    } = this.props

    let styles = {...container, ...shared}

    this.format = Props.getFormat(format, 'container')

    styles = renameProp(
      ['alignColY', 'alignColX'],
      ['vAlign'   , 'hAlign'   ],
    styles)

    this.styles = Props.getStyles({
      hAlign,
      vAlign,
      padding,
      margin,
      size,
    }, styles, this.format, inherit)

    this.flex = fitParent ? 1 : 0

    return (
      <View style={[
          {
            flexDirection: 'column',
            alignSelf: 'center',
            flex: this.flex,
          },
          ...this.styles,
          style
        ]}
        {...rest}
      >
        {this.props.children}
      </View>
    )
  }
}

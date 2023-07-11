import {
    View,
    Text,
} from 'react-native'
import Grid from './grid'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {renameProp} from 'react-native-reactive-library/src/lib/helpers'

export default class GridY extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    hAlign: propShapes.oneOf(optionsByKey(shared.alignColX, ['inherit'])),
    vAlign: propShapes.oneOf(optionsByKey(shared.alignColY, ['inherit'])),
    format: propShapes.string(),
    inherit: propShapes.bool()
  }

  render() {

    const {
      format,
      hAlign,
      vAlign,
      alignCells,
      inherit,
      style,
      ...rest
    } = this.props

    this.format = Props.getFormat(format, 'gridY')

    let styles = renameProp(
        ['alignColX', 'alignColY'],
        ['hAlign',    'vAlign'],
      shared)

    this.styles = Props.getStyles({
      hAlign,
      vAlign,
    }, styles, this.format, inherit)

    return (
      <Grid
        style={[
          {
            flexDirection: 'column',
          },
          ...this.styles,
          style
        ]}
        {...rest}
        direction="y"
      >
        {this.props.children}
      </Grid>
    )
  }
}

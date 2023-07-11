import Grid from './grid'
import React, {Component} from 'react'
import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {renameProp} from 'react-native-reactive-library/src/lib/helpers'

export default class GridX extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    hAlign: propShapes.oneOf(optionsByKey(shared.alignRowX, ['inherit'])),
    vAlign: propShapes.oneOf(optionsByKey(shared.alignRowY, ['inherit'])),
    format: propShapes.string(),
    inherit: propShapes.bool()
  }

  render() {

    const {
      hAlign,
      vAlign,
      alignCells,
      format,
      inherit,
      style,
      ...rest
    } = this.props

    let styles = shared

    this.format = Props.getFormat(format, 'gridX')

    styles = renameProp(
      ['alignRowY', 'alignRowX'],
      ['vAlign'   , 'hAlign'],
    styles)

    this.styles = Props.getStyles({
      hAlign,
      vAlign,
    }, styles, this.format, inherit)

    return (
      <Grid
        style={[
          {
            flexDirection: 'row',
          },
          ...this.styles,
          style
        ]}
        {...rest}
        direction="x"
      >
        {this.props.children}
      </Grid>
    )
  }
}

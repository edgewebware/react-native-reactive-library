import {
  View,
} from 'react-native'
import React, {Component} from 'react'
import Cell from '../grid/cell'
import GridX from '../grid/grid-x'
import Text from '../text/text'
import Props, {propShapes} from 'react-native-reactive-library/src/lib/prop'

export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  renderButtons() {
    const {children} = this.props

    return React.Children.map(children, (child, index) => {
      if (child) {
        let props = {
          ...child.props
        }

        if (children.length > 1) {
          if (index == 0) {
            props.style = {
              ...props.style,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }
          } else if (index == children.length - 1) {
            props.style = {
              ...props.style,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }
          } else {
            props.style = {
              ...props.style,
              borderRadius: 0,
            }
          }
        }

        return (<Cell size="auto">{React.cloneElement(child, props)}</Cell>)
      }
    })
  }

  render() {
    const {...rest} = this.props

    return (
      <GridX>{this.renderButtons()}</GridX>
    );
  }
}

import {
  View,
} from 'react-native'
import React, {Component} from 'react'
import Accordion from './accordion'
import Props, {propShapes} from 'react-native-reactive-library/src/lib/prop'

export default class AccordionGroup extends Component {
  constructor(props) {
    super(props);

    this.childExpanded = this.childExpanded.bind(this);
    this.updatingAccordions = false

    this.state =  state = {
      accordions: {}
    }

    this.setAccordions()
  }

  componentDidUpdate () {
    if (!this.updatingAccordions) {
      this.updatingAccordions = true
      this.clearAccordions()
      this.setAccordions()
      this.setState(this.state)
    } else {
      this.updatingAccordions = false
    }
  }

  static propTypes = {
    allowMultiExpand: propShapes.bool(),
    allowAllClosed:   propShapes.bool()
  }

  accordions = []

  clearAccordions () {
    this.accordions = []
  }

  setAccordions () {
    let state = this.state,
    id = 0


    React.Children.map(this.props.children, (accordion) => {
      if (accordion.type && accordion.type.displayName == 'Accordion') {
        id = accordion.props.childId ? accordion.props.childId : id

        let expanded = false
        if (this.state.accordions[id]) {
          expanded = this.state.accordions[id].expanded ? this.state.accordions[id].expanded : false
        } else {
          expanded = accordion.props.expanded ? accordion.props.expanded : false
        }

        state.accordions[id] = {
          expanded: expanded,
          loaded: false
        }

        let props = {...accordion.props, onExpand: this.childExpanded, childId: id, key: id}

        this.accordions.push(React.cloneElement(accordion, props))

        id++
      }
    })

    this.state = state
  }

  childExpanded(id) {
    const {allowMultiExpand, allowAllClosed} = this.props

    const current = this.state.accordions[id]
    let state = this.state

    state.accordions[id].expanded = !state.accordions[id].expanded

    const expanded = Object.values(state.accordions).filter(accordion => accordion.expanded).length

    for (var accordionId in state.accordions) {
      let accordion = state.accordions[accordionId]

      if (id == accordionId) {
        accordion.loaded = true
      } else {
        accordion.loaded = false
      }

      if (!allowMultiExpand && expanded > 1 && accordion.expanded && accordionId != id) {
        accordion.expanded = false
        accordion.loaded = true
      }

      if (!allowAllClosed && expanded < 1 && !accordion.expanded && accordionId == id) {
        accordion.expanded = true
        accordion.loaded = false
      }
    }

    this.updatingAccordions = true
    this.setState(state)
  }

  renderAccordions() {
    const {children, allowMultiExpand, allowAllClosed} = this.props

    return React.Children.map(this.accordions, (accordion) => {
      if (accordion.type.displayName == 'Accordion') {
        const state = this.state.accordions[accordion.props.childId]
        let props = {
          ...accordion.props,
          expanded: state ? state.expanded : false,
          loaded: state ? state.loaded : false
        }

        for (propName of Accordion.availableProps) {
          props[propName] = props[propName] ? props[propName] : this.props[propName]
        }

        return React.cloneElement(accordion, props)
      }
    })
  }

  render() {
    const {...rest} = this.props

    return (
      <View>{this.renderAccordions()}</View>
    );
  }
}

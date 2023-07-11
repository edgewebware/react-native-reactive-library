import React, {Component} from 'react'

import {get} from 'react-native-reactive-library/src/settings'

import Wrapper from './grid/wrapper';
import Container from './grid/container';
import GridY from './grid/grid-y';
import GridX from './grid/grid-x';
import Cell from './grid/cell';
import Button from './touchable/button';
import ButtonGroup from './touchable/button-group';
import TextField from './inputs/text-field';
import TextArea from './inputs/text-area';
import Select from './inputs/select';
import MultiSelect from './inputs/multi-select';
import DatePicker from './inputs/date-picker';
import RadioButton from './inputs/radio-button';
import CheckBox from './inputs/check-box';
import Accordion from './touchable/accordion';
import Link from './touchable/link';
import List from './list/list';
import ListItem from './list/list-item';
import BlockText from './text/block-text';
import Text from './text/text';

const mainComponents = {
  Container,
  GridY,
  GridX,
  Cell,
  Button,
  ButtonGroup,
  TextField,
  TextArea,
  Select,
  MultiSelect,
  DatePicker,
  RadioButton,
  CheckBox,
  Accordion,
  Link,
  List,
  ListItem,
  BlockText,
  Text
},
formats = get.formats()

let components = {}

for (var component in formats) {
  let name = component.charAt(0).toUpperCase() + component.slice(1),
      compFormat = formats[component];

  components[name] = {}

  for (var formatName in compFormat) {
    let format = compFormat[formatName],
        className = formatName.charAt(0).toUpperCase() + formatName.slice(1),
        clss = mainComponents[name]

    components[name][className] = class extends mainComponents[name] {
      constructor (props) {
        super(props)
      }

      static displayName = `${name}`

      render() {
        const {children, ...rest} = this.props,
              props = {...rest, format: this.formatName}

        return (
          React.createElement(mainComponents[name], props, children)
        )
      }
    }

    components[name][className].prototype.formatName = formatName
  }
}

export default components

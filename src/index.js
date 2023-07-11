import {styles, defaults, colors} from './styles'

import components from 'react-native-reactive-library/src/components'
import StyleSheet from './layout/style-sheet'
import Screen from './layout/screen'
import props from './layout/screen-props'

const Reactive = {
  // ...reactive-library,
  Screen,
  StyleSheet,
  props,
  styles,
  colors,
  defaults,
  components,
}

export default Reactive

export { default as Wrapper } from './components/grid/wrapper';
export { default as Container } from './components/grid/container';
export { default as GridY } from './components/grid/grid-y';
export { default as GridX } from './components/grid/grid-x';
export { default as Grid } from './components/grid/grid';
export { default as Cell } from './components/grid/cell';
export { default as Button } from './components/touchable/button';
export { default as ButtonGroup } from './components/touchable/button-group';
export { default as TextField } from './components/inputs/text-field';
export { default as TextArea } from './components/inputs/text-area';
export { default as Select } from './components/inputs/select';
export { default as MultiSelect } from './components/inputs/multi-select';
export { default as DatePicker } from './components/inputs/date-picker';
export { default as RadioButton } from './components/inputs/radio-button';
export { default as CheckBox } from './components/inputs/check-box';
export { default as Accordion } from './components/touchable/accordion';
export { default as AccordionGroup } from './components/touchable/accordion-group';
export { default as Link } from './components/touchable/link';
export { default as List } from './components/list/list';
export { default as ListItem } from './components/list/list-item';
export { default as BlockText } from './components/text/block-text';
export { default as Text } from './components/text/text';

export {Screen} from './layout/screen'

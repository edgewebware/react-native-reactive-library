import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'
import props from 'react-native-reactive-library/src/layout/screen-props'

import {get} from 'react-native-reactive-library/src/settings'

const styles   = get.styles(),
      defaults = get.defaults()
      
export const block = {
  styles: StyleSheet.create({
    container: {
      paddingLeft: defaults.padding,
      justifyContent: 'center',
    }
  }),
  size: StyleSheet.create(
    props.clone(styles.block.size, ['height', 'padding', 'margin'])
  ),
  textSize: StyleSheet.create(
    props.clone(styles.block.size, ['fontSize', 'lineHeight', 'fontWeight'])
  ),
}

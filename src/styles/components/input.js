import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'
import props from 'react-native-reactive-library/src/layout/screen-props'

import {get} from 'react-native-reactive-library/src/settings'

const styles = get.styles();
export const input = {
  size: StyleSheet.create(
    props.clone(styles.input.size, ['height', 'padding', 'margin'])
  ),
  textSize: StyleSheet.create(
    props.clone(styles.input.size, ['fontSize', 'lineHeight', 'fontWeight'])
  )
}

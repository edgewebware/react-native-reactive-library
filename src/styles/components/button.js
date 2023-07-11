import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'
import props from 'react-native-reactive-library/src/layout/screen-props'

import {get} from 'react-native-reactive-library/src/settings'

const styles = get.styles()

export const button = {
  size: StyleSheet.create(
    props.clone(styles.button.size, ['height', 'padding', 'margin'])
  ),
  textSize: StyleSheet.create(
    props.clone(styles.button.size, ['fontSize', 'lineHeight', 'fontWeight'])
  )
}

import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'
import props from 'react-native-reactive-library/src/layout/screen-props'
import {get} from 'react-native-reactive-library/src/settings'

const styles = get.styles()

export const container = {
  size: StyleSheet.create(styles.container.size),
}

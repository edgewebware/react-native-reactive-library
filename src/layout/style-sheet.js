import {StyleSheet} from 'react-native'
import props from './screen-props'

export default {
  create: (classes) => {
    let classStyleSheet = {}
    for (clss in classes) {
      if (classes.hasOwnProperty(clss)) {
        classStyleSheet[clss] = props.compile(classes[clss])
      }
    }

    return StyleSheet.create(classStyleSheet)
  }
}

import {get} from 'react-native-reactive-library/src/settings'
import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'

const colors   = get.colors(),
      defaults = get.defaults()

export const widthStyle = StyleSheet.create({
  full: {
    width: '100%'
  }
})

export const heightStyle = StyleSheet.create({
  full: {
    height: '100%'
  }
})
export const spacingStyle = StyleSheet.create({
  paddingX: {
    paddingLeft: defaults.padding,
    paddingRight: defaults.padding,
  },
  paddingY: {
    paddingTop: defaults.padding,
    paddingBottom: defaults.padding,
  },
  marginX: {
    marginLeft: defaults.margin,
    marginRight: defaults.margin,
  },
  marginY: {
    marginTop: defaults.margin,
    marginBottom: defaults.margin,
  },
})

let background = {}

for (color in colors) {
  background[color] = {
    backgroundColor: colors[color]
  }
}

export const backgroundStyle = StyleSheet.create(background)

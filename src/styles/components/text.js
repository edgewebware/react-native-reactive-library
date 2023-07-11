import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'
import {get} from 'react-native-reactive-library/src/settings'

const colors   = get.colors(),
      defaults = get.defaults(),
      styles   = get.styles()

let raw = {
  fontFamily: {},
  align: {
    left: {
      textAlign: 'left'
    },
    center: {
      textAlign: 'center'
    },
    right: {
      textAlign: 'right'
    },
    justify: {
      textAlign: 'justify'
    },
  },
  weight: {
    thin: {
      fontWeight: '100'
    },
    extraLight: {
      fontWeight: '200'
    },
    light: {
      fontWeight: '300'
    },
    regular: {
      fontWeight: '400'
    },
    semiBold: {
      fontWeight: '600'
    },
    bold: {
      fontWeight: '700',
    },
    extraBold: {
      fontWeight: '800',
    },
    black: {
      fontWeight: '900',
    },
  },
  size: styles.text.size,
  color: {},
}

for (color in colors) {
  raw.color[color] = {
    color: colors[color]
  }
}

for (family in defaults.fontFamily) {
  raw.fontFamily[family] = {
    fontFamily: defaults.fontFamily[family]
  }
}

export const text = {
  align: StyleSheet.create(raw.align),
  weight: StyleSheet.create(raw.weight),
  color: StyleSheet.create(raw.color),
  size: StyleSheet.create(raw.size),
  fontFamily: StyleSheet.create(raw.fontFamily),
}

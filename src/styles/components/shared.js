import {get} from 'react-native-reactive-library/src/settings'
import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'
import props from 'react-native-reactive-library/src/layout/screen-props'

const defaults = get.defaults()

export const shared = {
  spacing: StyleSheet.create({
    none: {
      marginTop: 0,
      marginBottom: 0
    },
    small: {
      marginTop: defaults.margin/4,
      marginBottom: defaults.margin/4,
    },
    medium: {
      marginTop: defaults.margin/2,
      marginBottom: defaults.margin/2
    },
    large: {
      marginTop: defaults.margin,
      marginBottom: defaults.margin
    },
  }),
  type: StyleSheet.create({
    rounded: {
      borderRadius: defaults.rounding,
    },
    square: {
      borderRadius: 0,
    }
  }),
  rounding: StyleSheet.create({
    none: {
      borderRadius: 0,
    },
    small: {
      borderRadius: defaults.rounding/2,
    },
    medium: {
      borderRadius: defaults.rounding,
    },
    large: {
      borderRadius: defaults.rounding * 2,
    }
  }),
  padding: StyleSheet.create({
    x: {
      paddingLeft: defaults.padding,
      paddingRight: defaults.padding,
    },
    y: {
      paddingTop: defaults.padding,
      paddingBottom: defaults.padding,
    },
    left: {
      paddingLeft: defaults.padding,
    },
    right: {
      paddingRight: defaults.padding,
    },
    top: {
      paddingTop: defaults.padding,
    },
    bottom: {
      paddingBottom: defaults.padding,
    },
    all: {
      padding: defaults.padding,
    },
    none: {
      padding: 0,
    }
  }),
  margin: StyleSheet.create({
    x: {
      marginLeft: defaults.margin,
      marginRight: defaults.margin,
    },
    y: {
      marginTop: defaults.margin,
      marginBottom: defaults.margin,
    },
    left: {
      marginLeft: defaults.margin,
    },
    right: {
      marginRight: defaults.margin,
    },
    top: {
      marginTop: defaults.margin,
    },
    bottom: {
      marginBottom: defaults.margin,
    },
    all: {
      margin: defaults.margin,
    }
  }),
  alignRowX: StyleSheet.create({
    left: {
      justifyContent: 'flex-start'
    },
    center: {
      justifyContent: 'center'
    },
    right: {
      justifyContent: 'flex-end'
    },
    justify: {
      justifyContent: 'space-between'
    },
    distribute: {
      justifyContent: 'space-around'
    },
  }),
  alignRowY: StyleSheet.create({
    top: {
      alignItems: 'flex-start'
    },
    middle: {
      alignContent: 'center',
      alignItems: 'center'
    },
    bottom: {
      alignItems: 'flex-end'
    },
    baseline: {
      alignItems: 'baseline'
    },
    stretch: {
      alignItems: 'stretch'
    },
  }),
  alignColX: StyleSheet.create({
    left: {
      alignItems: 'flex-start'
    },
    center: {
      alignItems: 'center'
    },
    right: {
      alignItems: 'flex-end'
    },
    baseline: {
      alignItems: 'baseline'
    },
    stretch: {
      alignItems: 'stretch'
    },
  }),
  alignColY: StyleSheet.create({
    top: {
      justifyContent: 'flex-start'
    },
    middle: {
      justifyContent: 'center'
    },
    bottom: {
      justifyContent: 'flex-end'
    },
    justify: {
      justifyContent: 'space-between'
    },
    distribute: {
      justifyContent: 'space-around'
    },
  }),
  alignSelf: StyleSheet.create({
    left: {
      alignSelf: 'flex-start'
    },
    right: {
      alignSelf: 'flex-end'
    },
    center: {
      alignSelf: 'center'
    },
    stretch: {
      alignSelf: 'stretch'
    },
    baseline: {
      alignSelf: 'baseline'
    },
    auto: {
      alignSelf: 'auto'
    },
  }),
  width: StyleSheet.create({
    full: {
      width: '100%',
    },
    auto: {
      width: null
    },
  }),
  styles: StyleSheet.create({
    wrapper: {
      position: 'relative',
      overflow: 'hidden',
      alignSelf: 'flex-start',
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      resizeMode: 'stretch',
    }
  })
}

import Screen from 'react-native-reactive-library/src/layout/screen'
import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'

let hide        = {},
    breakpoints = Screen.allBreakpoints()

for (var i = 0; i < breakpoints.length; i++) {
  let breakpoint = breakpoints[i],
      prevBreak  = breakpoints[i-1] ? breakpoints[i-1] : false
      nextBreak  = breakpoints[i+1] ? breakpoints[i+1] : false
      only = breakpoint+'Only'

  hide[breakpoint] = {}
  hide[breakpoint][breakpoint] = {
    display: 'none'
  }

  hide[only] = {}
  if (prevBreak) {
    hide[only][prevBreak] = {
      display: 'flex'
    }
  }

  hide[only][breakpoint] = {
    display: 'none'
  }

  if (nextBreak) {
    hide[only][nextBreak] = {
      display: 'flex'
    }
  }
}

export const hideStyle = StyleSheet.create(hide)

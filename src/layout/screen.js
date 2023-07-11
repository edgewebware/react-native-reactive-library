import {Dimensions} from 'react-native'

let screenCache = {}

const Screen = {
  // returns screens aspect ratio
  ratios: () => {
    if (screenCache.ratios) return screenCache.ratios

    const {height, width} = Dimensions.get('screen'),
          gcd             = greatestComDenom(width, height)

    screenCache.ratios = {width: width/gcd, height: height/gcd}
    return screenCache.ratios
  },
  aspectRatio: (reverse = false) => {
    screenCache.aspectRatio = screenCache.aspectRatio ? screenCache.aspectRatio : {}

    if (reverse) {
      if (screenCache.aspectRatio.reverse) return screenCache.aspectRatio.reverse

      const ratios = Screen.ratios()

      aspectRatio = screenCache.aspectRatio.reverse = ratios.height + ":" + ratios.width
    } else {
      if (screenCache.aspectRatio.actual) return screenCache.aspectRatio.actual

      const ratios = Screen.ratios()

      aspectRatio = screenCache.aspectRatio.actual = ratios.width + ":" + ratios.height
    }


    return aspectRatio
  },
  orientation: () => {
    if (screenCache.orientation) return screenCache.orientation

    const ratios = Screen.ratios()

    screenCache.orientation =  ratios.height >= ratios.width ? 'portrait' : 'landscape'

    return screenCache.orientation
  },
  // returns all breakpoints
  allBreakpoints: () => {
    if (screenCache.allBreakpoints) return screenCache.allBreakpoints

    screenCache.allBreakpoints = global.breakpoints.map(breakpoint => breakpoint.name)
    return screenCache.allBreakpoints
  },
  scale: (baseScreen, multiplier = 1, condition = 'minWidth') => {
    const validConditions = ['maxWidth', 'minWidth', 'minHeight', 'maxHeight']
    if (!validConditions.includes(condition)) throw Error(`Invalid condition "${condition}", should be one of the following: ${validConditions.join(', ')}`)
    if (!baseScreen) throw Error("Unable to find base screen size")

    const { height, width } = Dimensions.get('screen'),
    baseSize = global.breakpoints.filter(breakpoint => breakpoint.name == baseScreen)
                          .map(breakpoint => breakpoint[condition]),
    scale    = ((width / baseSize) - 1) * multiplier + 1

    return scale
  },
  // returns all applicable breakpoints
  getBreakpoints: () => {
    if (screenCache.getBreakpoints) return screenCache.getBreakpoints

    const {height, width}     = Dimensions.get('window'),
          aspectRatio         = Screen.aspectRatio(),
          reversedAspectRatio = Screen.aspectRatio(true),
          orientation         = Screen.orientation()


    screenCache.getBreakpoints = global.breakpoints.filter((breakpoint) => {
      let valid = true

      if (breakpoint.minWidth) {
        valid = valid ? width >= breakpoint.minWidth : false
      }
      if (breakpoint.maxWidth) {
        valid = valid ? width <= breakpoint.maxWidth : false
      }
      if (breakpoint.minHeight) {
        valid = valid ? height >= breakpoint.minHeight : false
      }
      if (breakpoint.maxHeight) {
        valid = valid ? height <= breakpoint.maxHeight : false
      }
      if (breakpoint.aspectRatio) {
        const optionalRatio = /^(\[)([0-9]:[0-9])(\])$/

        if (ratio = breakpoint.aspectRatio.match(optionalRatio)) {
          valid = valid ? (aspectRatio ==  ratio[2] || reversedAspectRatio ==  ratio[2]) : false
        } else {
          valid = valid ? aspectRatio == breakpoint.aspectRatio : false
        }
      }
      if (breakpoint.orientation) {
        valid = valid ? orientation == breakpoint.orientation : false
      }

      return valid
    }).map(breakpoint => breakpoint.name)

    return screenCache.getBreakpoints
  },
}

export default Screen;

// returns greatest common denominator of a and b
function greatestComDenom (a, b) {
  return (b == 0) ? a : greatestComDenom(b, a%b);
}

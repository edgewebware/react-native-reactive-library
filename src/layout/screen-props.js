import Screen from './screen'
import {isScalableStyle} from '../lib/helpers'

const breakpoints = global.breakpoints

const screenProps = {
  // rename object props
  rename: (obj, oldProps, newProps) => {
    let newObj = {}

    for (key in obj) {

      if (oldProps.includes(key)) {
        let index = oldProps.indexOf(key)
        newObj[newProps[index]] = obj[key]
      } else {
        newObj[key] = obj[key]
      }
    }

    return newObj
  },
  // clone object props to new object
  clone: (object, props, newProps) => {
    let newObj = {}

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        let clss = screenProps.compile(object[key])

        newObj[key] = {}
        for (var style in clss) {
          if (props.includes(style)) {
            let newStyle = style

            if (Array.isArray(newProps)) {
              let styleIndex = props.indexOf(style)
              newStyle = newProps[styleIndex]
            }
            newObj[key][newStyle] = clss[style]
          }
        }
      }
    }

    return newObj
  },
  // compiles props to filter out by screen size
  compile: (styles) => {
    let newStyle    = {},
        breakpoints = Screen.getBreakpoints(),
        sizeIndex   = -1,
        baseScreen  = breakpoints[0]

    if (styles !== null && typeof styles === 'object') {
      for (breakpoint of breakpoints) {
        if (styles.hasOwnProperty(breakpoint)) {
          if (styles[breakpoint] !== null && typeof styles[breakpoint] === 'object') {
            if (sizeIndex <= breakpoints.indexOf(breakpoint)) {
              sizeIndex = breakpoints.indexOf(breakpoint)
              if (styles[breakpoint].scalable) {
                baseScreen = breakpoint
              }
            }
            Object.assign(newStyle, styles[breakpoint])
          } else {
            newStyle = styles[breakpoint]
          }
        }
      }
      for (style in styles) {
        if (styles.hasOwnProperty(style)) {
          if (!Screen.allBreakpoints().includes(style)) {
            newStyle = styles
          }
        }
      }
    } else {
      newStyle = styles
    }

    if (newStyle.scalable) {
      let {ignore, include, multiplier, condition} = newStyle.scalable
      ignore = ignore ? ignore : []
      const scale = Screen.scale(baseScreen, multiplier, condition)

      delete newStyle.scalable

      for (var key in newStyle) {
        if (newStyle.hasOwnProperty(key)) {
          let value = newStyle[key]
          if (isScalableStyle(key, value)) {
            if (!isNaN(parseFloat(value)) && isFinite(value) && !ignore.includes(key)) {
              if (include) {
                if (include.includes(key)) {
                  newStyle[key] = value * scale
                }
              } else {
                newStyle[key] = value * scale
              }
            }
          }
        }
      }
    }

    return newStyle
  },
}

export default screenProps;

import PropTypes from 'prop-types'
import Screen from '../layout/screen'
import {StyleSheet} from 'react-native'
import tinycolor from 'tinycolor2'
import {get} from 'react-native-reactive-library/src/settings'

// Validates only if there are no errors
const allPropTypes = (...types) => (...args) => {
  const errors = types.map((type) => type(...args)).filter(Boolean);
  if (errors.length === 0) return;

  const message = errors.map((e) => e.message).join('\n');
  return new Error(message);
};

// Validates if at least one proptype is valid
const onePropTypes = (...types) => (...args) => {
  const errors = types.map((type) => type(...args)).filter(Boolean);
  if (errors.length < types.length) return;

  const message = errors.map((e) => e.message).join('\n');
  return new Error(message);
};

export const propShapes = {
  number: function () {
    return onePropTypes(
      PropTypes.objectOf(PropTypes.number),
      PropTypes.number
    )
  },
  bool: function () {
    return onePropTypes(
      PropTypes.objectOf(PropTypes.bool),
      PropTypes.bool
    )
  },
  string: function () {
    return onePropTypes(
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string
    )
  },
  oneOf: function (options) {
    return onePropTypes(
      PropTypes.objectOf(PropTypes.oneOf(options)),
      PropTypes.oneOf(options)
    )
  }
}

export function optionsByKey(object = [], otherOptions = []) {
  return [...Object.keys(object), ...otherOptions]
}

let propsCache = {
  lineHeight: {}
}

const Props = {
  activeBackground: (styles) => {
    let bg         = StyleSheet.flatten(styles).backgroundColor,
        inactiveBg = tinycolor(bg ? bg : '#fff'),
        brightness = inactiveBg.getBrightness(),
        activeBg   = {}

    if (brightness < 30) {
      activeBg.ios = inactiveBg.lighten(10)
      activeBg.android = inactiveBg.lighten(12)
    } else {
      activeBg.ios = inactiveBg.darken(2)
      activeBg.android = inactiveBg.darken(8)
    }

    activeBg.ios = activeBg.ios.toHexString()
    activeBg.android = activeBg.android.toHexString()

    return activeBg
  },
  getBySize: (sizes) => {
    let size = null
    if (sizes !== null && typeof sizes === 'object') {
      let breakpoints = Screen.getBreakpoints()
      for (breakpoint of breakpoints) {
        if (sizes[breakpoint] !== undefined) {
          size = sizes[breakpoint]
        }
      }
    } else {
      size = sizes
    }

    return size
  },
  getFormat: (format, type) => {
    const formats = get.formats()
    if (formats.hasOwnProperty(type)) {
      if (formats[type].hasOwnProperty(format)) {
        return formats[type][format]
      } else {
        return formats[type].default
      }
    }
  },
  getActive: (inactiveProps, props, defaults) => {
    let newProps = {}

    for (var key in inactiveProps) {
      const camelKey  = key.charAt(0).toUpperCase() + key.slice(1);
            activeKey = `active${camelKey}`,
            value     = props[activeKey] ? props[activeKey] : defaults[activeKey],
            defValue  = inactiveProps[key]

      newProps[key] = value ? value : defValue
    }
    return newProps
  },
  getLineHeight: (lineHeight, size, defaults, inherit = false) => {

    let multiplier = Props.pass(lineHeight, defaults, inherit, 'lineHeight')
    if (!multiplier) return undefined
    if (!`${multiplier}`.match(/^[\d\.]+em$/)) return {lineHeight: lineHeight}
    multiplier = parseFloat(multiplier.replace(/[^0-9.]/g, ''))
    const key = `${size}-${multiplier}`
    let cache = propsCache.lineHeight[key],
        style = null

    if (cache) return cache

    style = StyleSheet.flatten(size)

    if (!style || !style.hasOwnProperty('fontSize')) return

    propsCache.lineHeight[key] = {lineHeight: multiplier * style.fontSize}

    return propsCache.lineHeight[key]
  },
  getStylesObj: (props, styles, format = {}, inherit = false, includeStyle = true) => {
    const allowedStyles = ['width', 'fontStyle']

    let newProps = {}
    for (var name in props) {
      let prop  = Props.getBySize(props[name]),
          style = styles[name],
          preProp = prop ? prop : (inherit ? undefined : format[name])

      if (style && style.hasOwnProperty(preProp)) {
        newProps[name] = style[preProp]
      } else if (name.toLowerCase().includes('color')) {
        if (preProp) {
          const colors = get.colors()
          if (colors.hasOwnProperty(preProp)) {
            newProps[name] = {[name]: colors[preProp]}
          } else {
            newProps[name] = {[name]: preProp}
          }
        }
      } else if (typeof preProp == 'number' || allowedStyles.includes(name)) {
        if (preProp) {
          newProps[name] = {[name]: preProp}
        }
      }
    }

    if (format.style && includeStyle) {
      newProps.style = format.style
    }

    return newProps
  },
  getStyles: (props, styles, defaults = {}, inherit = false, includeStyle = true) => {
    return Object.values(Props.getStylesObj(props, styles, defaults, inherit, includeStyle))
  },
  pass: (props, format = {}, inherit = false, propName = null) => {
    if (props !== null && typeof props === 'object') {
      let passedProps = {}

      for (name in props) {
        let prop = props[name]

        passedProps[name] = prop ? Props.getBySize(prop) : (inherit ? undefined : format[name])
      }

      return passedProps
    } else {
      return props ? Props.getBySize(props) : (inherit ? undefined : format[propName])
    }
  }
}

export default Props

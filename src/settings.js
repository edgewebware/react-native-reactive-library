import screenProps from 'react-native-reactive-library/src/layout/screen-props'

let settings = {
  breakpoints: [],
  colors: {},
  styles: {},
  defaults: {},
  formats: {},
}

const set = {
  styles: (styles) => {
    settings.styles = {...settings.styles, ...styles}
  },
  colors: (colors) => {
    settings.colors = {...settings.colors, ...colors}
  },
  formats: (formats) => {
    for (var name in formats) {
      let comp = formats[name]
      for (var name in comp) {
        comp[name] = {...comp.default, ...comp[name]}
      }
    }

    settings.formats = {...settings.formats, ...formats}
  },
  defaults: (defaults) => {
    for (var def in defaults) {
      defaults[def] = screenProps.compile(defaults[def])
    }

    settings.defaults = {...settings.defaults, ...defaults}
  },
  breakpoints: (breakpoints) => {
    settings.breakpoints = [...settings.breakpoints, ...breakpoints]
    global.breakpoints = settings.breakpoints
  }
}

const get = {
  styles: () => {
    return settings.styles
  },
  colors: () => {
    return settings.colors
  },
  formats: () => {
    return settings.formats
  },
  defaults: () => {
    return settings.defaults
  },
  breakpoints: () => {
    return settings.breakpoints
  }
}

export {set, get}

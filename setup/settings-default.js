import {set} from 'react-native-reactive-library/src/settings'

const colors = {
  primary   : '#0B4F6C',
  secondary : '#548687',
  warning   : '#FF421C',
  info      : '#01BAEF',
  success   : '#20BF55',
  white     : '#FBFBFF',
  lightGray : '#CCC8C7',
  gray      : '#9f9f9f',
  darkGray  : '#4D4D4D',
  black     : '#232323',
}

export const breakpoints = [
  {
    name     : 'xsmall',
    minWidth : 320
  },
  {
    name     : 'small',
    minWidth : 414
  },
  {
    name     : 'medium',
    minWidth : 568
  },
  {
    name     : 'large',
    minWidth : 736
  },
  {
    name     : 'xlarge',
    minWidth : 1024
  }
]

let defaults = {}

defaults.gridSize = 12

defaults.padding = {
  xsmall : 12,
  small  : 15,
  medium : 18,
  large  : 21,
  xlarge : 25,
}

defaults.margin = {
  xsmall : 12,
  small  : 15,
  medium : 18,
  large  : 21,
  xlarge : 25,
}

defaults.rounding = {
  xsmall : 8,
  small  : 10,
  medium : 12,
  large  : 14,
  xlarge : 16,
}

defaults.fontFamily = {
  body: 'Open Sans',
  header: 'Open Sans',
}

let formats = {}

formats.text = {
  default: {
    size       : 'default',
    spacing    : 'none',
    color      : 'black',
    align      : 'left',
    fontFamily : 'body',
    weight     : 'regular',
    lineHeight : '1.4em'
  },
  h1: {
    fontSize : 'h1',
    weight   : 'semiBold',
    color    : 'primary',
  },
  h2: {
    fontSize : 'h2',
    weight   : 'semiBold',
    color    : 'secondary',
  },
  h3: {
    fontSize : 'h3',
    weight   : 'bold',
    color    : 'primary',
  },
  h4: {
    fontSize : 'h4',
    weight   : 'bold',
  },
  h5: {
    fontSize : 'h5',
    weight   : 'bold',
  },
  h6: {
    fontSize : 'default',
    weight   : 'bold',
  }
}

//inherits from text
formats.link = {
  default: {
    color : 'primary'
  }
}
//inherits from text
formats.list = {
  default: {
    weight     : 'black',
    lineHeight : '1.4em'
  }
}

formats.button = {
  default: {
    size            : 'medium',
    // text props
    color           : 'white',
    fontFamily      : 'body',
    align           : 'center',
    weight          : 'regular',
    // wrapper props
    backgroundColor : 'black',
    spacing         : 'small',
    rounding        : 'medium',
    borderWidth     : 1,
    borderColor     : 'black',
    padding         : 'x',
  },
  primary: {
    backgroundColor : 'primary',
    borderColor     : 'primary',
  },
  secondary: {
    backgroundColor : 'secondary',
    borderColor     : 'secondary',
  },
  success: {
    backgroundColor : 'success',
    borderColor     : 'success',
    weight          : 'bold'
  },
  warning: {
    backgroundColor : 'warning',
    borderColor     : 'warning',
    weight          : 'bold',
  },
  info: {
    backgroundColor : 'info',
    borderColor     : 'info',
  }
}

formats.accordion = {
  default: {
    size            : 'medium',
    // text props
    color           : 'white',
    fontFamily      : 'body',
    align           : 'left',
    weight          : 'semiBold',
    // wrapper props
    backgroundColor : 'black',
    spacing         : 'none',
    rounding        : 'none',
    borderColor     : 'black',
    padding         : 'x',
    style: {
      borderBottomWidth : 1,
    }
  },
  primary: {
    ...formats.button.primary,
    borderColor : 'lightPrimary'
  }
}

formats.blockText = {
  default: {
    size            : 'medium',
    // text props
    color           : 'white',
    fontFamily      : 'body',
    align           : 'center',
    weight          : 'semiBold',
    //wrapper props
    width           : 'full',
    backgroundColor : 'black',
    spacing         : 'none',
    rounding        : 'none',
    borderColor     : 'black',
    padding         : 'x',
    borderWidth     : 1,
  },
  primary: {
    ...formats.button.primary
  },
}

formats.cell = {
  default: {
    padding : 'none',
    margin  : 'none',
  }
}

formats.gridX = {
  default: {
    padding : 'none',
    margin  : 'none',
    vAlign  : 'top',
    hAlign  : 'left',
  }
}

formats.gridY = {
  default: {
    padding : 'none',
    margin  : 'none',
    vAlign  : 'top',
    hAlign  : 'left',
  }
}

formats.container = {
  default: {
    padding : 'none',
    margin  : 'none',
    size    : 'xlarge'
  }
}

let styles = {}

styles.text = {
  size: {
    tiny: {
      fontSize: 9,
      scalable: {
        multiplier: 0.4
      },
    },
    default: {
      fontSize: 14,
      scalable: {
        multiplier: 0.4
      },
    },
    h5: {
      fontSize: 14,
      scalable: {
        multiplier: 0.4
      },
    },
    h4: {
      fontSize: 16,
      scalable: {
        multiplier: 0.4
      },
    },
    h3: {
      fontSize: 20,
      scalable: {
        multiplier: 0.4
      },
    },
    h2: {
      fontSize: 26,
      scalable: {
        multiplier: 0.4
      },
    },
    h1: {
      fontSize: 32,
      scalable: {
        multiplier: 0.4
      },
    }
  }
}

styles.container = {
  size: {
    xlarge: {
      width: '100%'
    },
    large: {
      width: '87.5%'
    },
    medium: {
      width: '75%'
    },
    small: {
      width: '62.5%'
    },
    xsmall: {
      width: '50%'
    }
  }
}

styles.button = {
  size: {
    large: {
      height   : 54,
      fontSize : 16,
      scalable : {
        multiplier : 0.4
      },
    },
    medium: {
      height   : 42,
      fontSize : 12,
      scalable : {
        multiplier : 0.4
      },
    },
    small: {
      height   : 30,
      fontSize : 10,
      scalable : {
        multiplier : 0.4
      },
    },
  }
}
// block text and accordion components
styles.block = {
  size: {
    large: {
      height   : 42,
      fontSize : 14,
      scalable : {
        multiplier : 0.4
      },
    },
    medium: {
      height   : 40,
      fontSize : 11,
      scalable : {
        multiplier : 0.4
      },
    },
    small: {
      height   : 32,
      fontSize : 10,
      scalable : {
        multiplier : 0.4
      },
    },
  }
}

// set breakpoints first, as others rely upon this
set.breakpoints(breakpoints)
set.styles(styles)
set.defaults(defaults)
set.formats(formats)
set.colors(colors)

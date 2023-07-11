import Screen from '../layout/screen'
import {StyleSheet} from 'react-native'
import tinycolor from 'tinycolor2'

// rename object props
export function renameProp (oldProps, newProps, obj) {
  let newObj = {}

  for (property in obj) {

    if (oldProps.includes(property)) {
      let index = oldProps.indexOf(property)
      newObj[newProps[index]] = obj[property]
    } else {
      newObj[property] = obj[property]
    }
  }

  return newObj
};

/*
Expects:
note: screensize is small

object = {
  style1: {
    small: {
      height: 70,
      fontSize: 23,
    },
    xsmall: {
      fontWeight: '500',
      height: 42,
      fontSize: 12,
    },
  },
  style2: {
    height: 60,
    fontSize: 20,
  },
}
        target
getStyle(styles)

Output:
{
  style1: {
    fontSize: 23,
    height: 70,
    weight: '500'
  },
  style2: {
    fontSize: 20,
    weight: '400',
  }
}
*/

export function getStyle(styles) {
  if (styles !== null && typeof styles === 'object') {
    let breakpoints = Screen.getBreakpoints(),
        sizeIndex   = -1
    for (breakpoint of breakpoints) {
      if (styles.hasOwnProperty(breakpoint)) {
        if (styles[breakpoint] !== null && typeof styles[breakpoint] === 'object') {
          if (sizeIndex > breakpoints.indexOf(breakpoint)) {
            Object.assign(newStyle, styles[breakpoint])
          } else {
            sizeIndex = breakpoints.indexOf(style)
            Object.assign(newStyle, styles[breakpoint])
          }
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

  return newStyle
}

// converts integer to roman numeral

export function convertToRoman(num) {
  var remainingValue = num;
  var newRomanNumeral = "";

  var romanNumerals = [{
    numeral: "m",
    value: 1000
  }, {
    numeral: "cm",
    value: 900
  }, {
    numeral: "d",
    value: 500
  }, {
    numeral: "cd",
    value: 400
  }, {
    numeral: "c",
    value: 100
  }, {
    numeral: "xc",
    value: 90
  }, {
    numeral: "l",
    value: 50
  }, {
    numeral: "xl",
    value: 40
  }, {
    numeral: "x",
    value: 10
  }, {
    numeral: "ix",
    value: 9
  }, {
    numeral: "v",
    value: 5
  }, {
    numeral: "iv",
    value: 4
  }, {
    numeral: "i",
    value: 1
  }];

  for (var i = 0; i < 13; i++) {
    var j = Math.floor(remainingValue / romanNumerals[i].value); // j represents the number of times each character is needed
       while (remainingValue >= romanNumerals[i].value) {
         newRomanNumeral += romanNumerals[i].numeral.repeat(j); // Add 'x' Numerals to the string
         remainingValue -= (romanNumerals[i].value * j); // decrement the remaining value
       }
  }

    return newRomanNumeral;
}

// converts integer to letter
export function convertToLetter(num) {
  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
        length = alphabet.length

  const checkSize = (num) => {
    if (num >= length) {
      let newDigit = Math.floor(num/length)

      if (newDigit >= length) {
        checkSize(newDigit)
        letter += alphabet[(newDigit % length)-1];
      } else {
        letter += alphabet[Math.floor(num/length)-1]
      }
    }
  }

  let letter = ""
  num -= 1

  checkSize(num)

  letter += alphabet[(num % length)]

  return letter
}

export function isScalableStyle (style, value) {
  const validStyles = ['height', 'width', 'padding', 'margin', 'fontSize', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'borderWidth', 'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderRadius', 'borderBottomEndRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius', 'borderBottomStartRadius', 'borderTopEndRadius', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopStartRadius', 'lineHeight', 'top', 'left', 'right', 'bottom']

  if (validStyles.includes(style) && !isNaN(parseFloat(value)) && isFinite(value)) return true

  return false
}

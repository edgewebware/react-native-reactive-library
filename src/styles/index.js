import {text} from './components/text'
import {button} from './components/button'
import {input} from './components/input'
import {widthStyle, heightStyle, spacingStyle, backgroundStyle} from './general/block'
import {hideStyle} from './general/hide'
import {transformStyle} from './general/transform'
import {get} from 'react-native-reactive-library/src/settings'

const styles = {
  text: text,
  button: button,
  input: input,
  width: widthStyle,
  height: heightStyle,
  spacing: spacingStyle,
  color: backgroundStyle,
  hide: hideStyle,
  transform: transformStyle,
},
defaults = get.defaults(),
colors = get.colors()

export {styles, defaults, colors}

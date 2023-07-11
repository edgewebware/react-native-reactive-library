import StyleSheet from 'react-native-reactive-library/src/layout/style-sheet'

const transform = {
  rotate45: {
    transform: [
      {rotate: '45deg'}
    ],
  },
  rotate90: {
    transform: [
      {rotate: '90deg'}
    ],
  },
  rotate135: {
    transform: [
      {rotate: '135deg'}
    ],
  },
  rotate180: {
    transform: [
      {rotate: '180deg'}
    ],
  },
  rotate225: {
    transform: [
      {rotate: '225deg'}
    ],
  },
  rotate270: {
    transform: [
      {rotate: '270deg'}
    ],
  },
  rotate315: {
    transform: [
      {rotate: '315deg'}
    ],
  },
}

export const transformStyle = StyleSheet.create(transform)

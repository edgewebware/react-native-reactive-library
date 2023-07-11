import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native'

export default class Wrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      height: null,
      width: null
    }
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    this.setState({width, height})
  }

  render() {
    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={styles.container}
        >
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

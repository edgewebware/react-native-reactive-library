import React, { PureComponent } from 'react';
import {
    ColorPropType,
    Modal,
    Picker,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import {GridX, Cell} from 'react-native-reactive-library'

import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {input} from 'react-native-reactive-library/src/styles/components/input'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'
import {get} from 'react-native-reactive-library/src/settings'

const colors = get.colors()

export default class RadioButton extends PureComponent {
    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        checked: propShapes.bool(),
    };

    static defaultProps = {
        checked: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: this.props.checked,
        };

        this.onValueChange = this.onValueChange.bind(this);
    }


    onValueChange(checked) {
        this.props.onValueChange(checked);

        this.setState({
            checked: checked
        });
    }

    renderChecked() {
        if (this.state.checked) {
            return (
                this.props.icon
            );
        }
    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row', marginVertical: 2}}>
                    <View style={{flexGrow: 1, flex: 1}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.onValueChange(!this.state.checked);
                            }}
                        >
                            <GridX vAlign="middle">
                                <Cell size="shrink">
                                    <View style={{height: 20, width: 20, backgroundColor: 'white', borderWidth: 2, borderColor: 'gray', borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                                        {this.renderChecked()}
                                    </View>
                                </Cell>
                                <Cell size="auto" style={{marginLeft: 10}}>
                                    <Text>{this.props.label}</Text>
                                </Cell>
                            </GridX>
                        </TouchableOpacity>

                    </View>
                </View>

                {this.props.errorMessage && (
                  <Text style={{color: colors.error, marginBottom: 10}}>{this.props.errorMessage}</Text>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
});


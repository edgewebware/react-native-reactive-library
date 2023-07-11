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

function isEqual(a1, a2) {
  return a1 == a2
}

function getSelectedItem({ items, key, value }) {
    let idx = items.findIndex((item) => {
        if (item.value && value) {
            return isEqual(item.value, value);
        }

        if (item.label && value) {
            return isEqual(item.label, value);
        }
    });
    return {
        selectedItem: items[idx],
        idx,
    };
}

export default class RadioButton extends PureComponent {
    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.any.isRequired,
                key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                color: ColorPropType,
            })
        ).isRequired,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        mode: PropTypes.string,
        animationType: PropTypes.string,
        rounding: propShapes.oneOf(optionsByKey(shared.rounding)),
        size: propShapes.oneOf(optionsByKey(input.size)),
        spacing: propShapes.oneOf(optionsByKey(shared.spacing, ['inherit'])),
        width: propShapes.oneOf(optionsByKey(shared.width, ['inherit'])),
        padding: propShapes.oneOf(optionsByKey(shared.padding, ['inherit'])),
        backgroundColor: propShapes.string(),
        borderColor: propShapes.string(),
        borderWidth: propShapes.number(),
        format: propShapes.string(),
        inherit: propShapes.bool(),
    };

    static defaultProps = {
        disabled: false,
        defaultValue: undefined,
        itemKey: null,
        style: {},
        children: null,
    };

    constructor(props) {
        super(props);

        const items = props.items;
        const { selectedItem } = getSelectedItem({
            items,
            key: props.itemKey,
            value: props.defaultValue,
        });
        this.state = {
            items,
            selectedItem,
            showPicker: false,
            animationType: undefined,
        };

        this.onValueChange = this.onValueChange.bind(this);
    }


    onValueChange(value, index) {
        this.props.onValueChange(value.value, index);

        this.setState({
            selectedItem: this.state.items[index],
        });
    }

    renderActive(item) {
        if (this.state.selectedItem && item.value == this.state.selectedItem.value) {
            return (
                <View style={{height: 8, width: 8, backgroundColor: 'gray', borderRadius: 10}}></View>
            );
        }

    }

    render() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    {this.state.items.map((item, i) => 
                        <View key={i} style={{flexGrow: 1, flex: 1}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onValueChange(item, i);
                                }}
                            >
                                <GridX vAlign="middle" wrap={false}>
                                    <Cell size="shrink">
                                        <View style={{height: 18, width: 18, backgroundColor: 'white', borderWidth: 2, borderColor: 'gray', borderRadius: 10, padding: 3}}>
                                            {this.renderActive(item)}
                                        </View>
                                    </Cell>
                                    <Cell size="auto" style={{marginLeft: 10, flex: 1}}>
                                        <Text>{item.label}</Text>
                                    </Cell>
                                </GridX>
                            </TouchableOpacity>

                        </View>
                    )}
                </View>

                {this.props.errorMessage && (
                  <Text style={{color: colors.error, marginBottom: 10}}>{this.props.errorMessage}</Text>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        alignSelf: 'stretch',
    },
    chevron: {
        width: 15,
        height: 15,
        backgroundColor: 'transparent',
        borderTopWidth: 1.5,
        borderTopColor: '#D0D4DB',
        borderRightWidth: 1.5,
        borderRightColor: '#D0D4DB',
    },
    chevronUp: {
        transform: [{ translateY: 17 }, { rotate: '-45deg' }],
    },
    chevronDown: {
        transform: [{ translateY: 8 }, { rotate: '135deg' }],
    },
    chevronActive: {
        borderTopColor: '#007AFE',
        borderRightColor: '#007AFE',
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'gray',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 10,
    },
    modalViewTop: {
        flex: 1,
    },
    modalViewMiddle: {
        height: 44,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EFF1F2',
        borderTopWidth: 0.5,
        borderTopColor: '#919498',
    },
    modalViewBottom: {
        height: 215,
        justifyContent: 'center',
        backgroundColor: '#D0D4DB',
    },
    done: {
        color: '#007AFE',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 18,
    },
    underline: {
        borderTopWidth: 1,
        borderTopColor: '#888988',
        marginHorizontal: 4,
    },
});


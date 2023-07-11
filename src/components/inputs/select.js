import React, { PureComponent } from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
        if (item.key && key) {
            return isEqual(item.key, key);
        }

        if (item.label && value) {
            return isEqual(item.value, value);
        }
    });

    if (idx === -1) {
        idx = 0;
    }
    return {
        selectedItem: items[idx],
        idx,
    };
}

export default class Select extends PureComponent {
    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        mode: PropTypes.string,
        animationType: PropTypes.string,
        onUpArrow: PropTypes.func,
        onDownArrow: PropTypes.func,
        doneText: PropTypes.string,
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
        hideDoneBar: false,
        hideIcon: false,
        disabled: false,
        defaultValue: undefined,
        itemKey: null,
        style: {},
        children: null,
        mode: 'dialog',
        animationType: 'slide',
        onUpArrow: null,
        onDownArrow: null,
        doneText: 'Done',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        // update items if items prop changes
        const itemsChanged = !isEqual(prevState.items, nextProps.items);
        // update selectedItem if value prop is defined and differs from currently selected item
        const newItems = nextProps.items
        const { selectedItem, idx } = getSelectedItem({
            items: newItems,
            key: nextProps.itemKey,
            value: nextProps.defaultValue,
        });

        if (itemsChanged) {
            return {
                items: itemsChanged ? newItems : prevState.items,
                selectedItem: selectedItem,
            };
        }

        return null;
    }

    focus() {
        this.setState({
            animationType: this.props.animationType,
            showPicker: true,
        });
    }

    constructor(props) {
        super(props);

        const items = props.items
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
        this.togglePicker = this.togglePicker.bind(this);
    }

    onValueChange(value, index) {
        this.props.onValueChange(value, index);

        this.setState({
            selectedItem: this.state.items[index],
        });
    }

    getPlaceholderStyle() {
        if (
            !isEqual(this.props.placeholder, {}) &&
            this.state.selectedItem.label === this.props.placeholder.label
        ) {
            return { color: this.props.style.placeholderColor || '#C7C7CD' };
        }
        return {};
    }

    togglePicker(animate = false) {
        if (this.props.disabled) {
            return;
        }
        if (!this.state.showPicker && this.inputRef) {
            this.inputRef.focus();
            this.inputRef.blur();
        }

        this.setState({
            animationType: animate ? this.props.animationType : undefined,
            showPicker: !this.state.showPicker,
        });
    }

    closePicker() {
        // if (this.props.scrollToInput) {
        //     setTimeout(function function_name(argument) {
        //         console.log(ReactNative.findNodeHandle(this.select))

        //         this.props.scrollToInput(ReactNative.findNodeHandle(this.select))
        //     }, 2000)
        // }

        if (this.inputRef) {
            this.inputRef.focus();
            this.inputRef.blur();
        };

        this.setState({
            animationType: this.props.animationType,
            showPicker: false,
        }, function() {
            if (this.props.onDone) {
                this.props.onDone();
            }
        });
    }

    renderPickerItems() {
        return this.state.items.map((item) => {
            return (
                <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={item.key || item.label}
                    color={item.color}
                />
            );
        });
    }

    renderDoneBar() {
        if (this.props.hideDoneBar) {
            return null;
        }

        return (
            <View style={[styles.modalViewMiddle, this.props.style.modalViewMiddle]}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                    <TouchableOpacity
                        activeOpacity={this.props.onUpArrow ? 0.5 : 1}
                        onPress={this.props.onUpArrow ? this.onUpArrow : null}
                    >
                        <View
                            style={[
                                styles.chevron,
                                this.props.style.chevron,
                                styles.chevronUp,
                                this.props.style.chevronUp,
                                this.props.onUpArrow
                                    ? [styles.chevronActive, this.props.style.chevronActive]
                                    : {},
                            ]}
                        />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 10 }} />
                    <TouchableOpacity
                        activeOpacity={this.props.onDownArrow ? 0.5 : 1}
                        onPress={this.props.onDownArrow ? this.onDownArrow : null}
                    >
                        <View
                            style={[
                                styles.chevron,
                                this.props.style.chevron,
                                styles.chevronDown,
                                this.props.style.chevronDown,
                                this.props.onDownArrow
                                    ? [styles.chevronActive, this.props.style.chevronActive]
                                    : {},
                            ]}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.closePicker();
                    }}
                    hitSlop={{ top: 2, right: 2, bottom: 2, left: 2 }}
                >
                    <View>
                        <Text style={[styles.done, this.props.style.done]}>
                            {this.props.doneText}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    renderIcon() {
        if (this.props.hideIcon) {
            return null;
        }

        return <View testID="icon_ios" style={[styles.icon, this.props.style.icon]} />;
    }

    renderTextInput() {
        const {color, size, fontFamily, align, weight, backgroundColor, width, spacing, rounding, borderWidth, borderColor, padding, format, value, inherit, style, ...rest} = this.props

        let styles   = {...input, ...shared},
            textSize = size

        this.format = Props.getFormat(format, 'textField')
        this.format.alignSelf = this.format.align
        this.format.textSize = this.format.size

        this.styles = Props.getStyles({
          borderWidth,
          borderColor,
          rounding,
          width,
          spacing,
          padding,
          size,
          backgroundColor
        }, styles, this.format, inherit)

        this.wrapperStyles = Props.getStyles({
          alignSelf: align
        }, styles, this.format, inherit)

        this.textStyle = Props.getStyles({
          textSize,
            color,
            fontFamily,
            align,
            weight,
        }, styles, this.format, inherit)

        return (
          <View pointerEvents="box-only">
            <GridX vAlign="middle" style={[
                shared.styles.wrapper,
                ...this.styles,
                style,
              ]}
              wrap={false}>
              <Cell size="auto">
                <TextInput
                  value={this.state.selectedItem.label}
                  style={[this.textStyle, style]}
                  ref={(ref) => {
                      this.inputRef = ref;
                  }}/>
              </Cell>

              <Cell size="shrink">
                {this.props.icon}
              </Cell>
            </GridX>
          </View>
        );
    }

    renderIOS() {
        return (
            <View ref={view => {this.select = view}}>
                <View style={[styles.viewContainer, this.props.style.viewContainer]}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.togglePicker(true);
                        }}
                    >
                        {this.renderTextInput()}
                    </TouchableWithoutFeedback>
                    <Modal
                        visible={this.state.showPicker}
                        transparent
                        animationType={this.state.animationType}
                        supportedOrientations={['portrait', 'landscape']}
                    >
                        <TouchableOpacity
                            style={[styles.modalViewTop, this.props.style.modalViewTop]}
                            onPress={() => {
                                this.togglePicker(true);
                            }}
                        />
                        {this.renderDoneBar()}
                        <View style={[styles.modalViewBottom, this.props.style.modalViewBottom]}>
                            <Picker
                                onValueChange={this.onValueChange}
                                selectedValue={this.state.selectedItem.value}
                                testID="RNPickerSelectIOS"
                            >
                                {this.renderPickerItems()}
                            </Picker>
                        </View>
                    </Modal>
                </View>
                {this.props.errorMessage && (
                  <Text style={{color: colors.error, marginBottom: 10}}>{this.props.errorMessage}</Text>
                )}
            </View>
        );
    }

    renderAndroid() {
        const {color, size, fontFamily, align, weight, backgroundColor, width, spacing, rounding, borderWidth, borderColor, padding, format, value, inherit, style, ...rest} = this.props

        let styles   = {...input, ...shared},
            textSize = size

        this.format = Props.getFormat(format, 'textField')
        this.format.alignSelf = this.format.align
        this.format.textSize = this.format.size

        this.styles = Props.getStyles({
          borderWidth,
          borderColor,
          rounding,
          width,
          spacing,
          padding,
          size,
          backgroundColor
        }, styles, this.format, inherit)

        this.wrapperStyles = Props.getStyles({
          alignSelf: align
        }, styles, this.format, inherit)
        this.textStyle = Props.getStyles({
          textSize,
        }, styles, this.format, inherit)

        this.textProps = Props.pass({
          color,
          fontFamily,
          align,
          weight
        }, this.format, inherit)

        return (
            <View ref={view => {this.select = view}}>
                <View style={[styles.viewContainer, this.props.style.viewContainer]}>
                    <GridX vAlign="middle" style={[
                        shared.styles.wrapper,
                        ...this.styles,
                        style,
                      ]}>
                        <Cell size="auto">
                            <Picker
                                dropdownIconColor="white"
                                style={[this.textStyle, style]}
                                onValueChange={this.onValueChange}
                                style={{backgroundColor: 'transparent'}}
                                selectedValue={this.state.selectedItem.value}
                                testID="RNPickerSelectAndroid"
                                mode={this.props.mode}
                                enabled={!this.props.disabled}
                            >
                                {this.renderPickerItems()}
                            </Picker>
                        </Cell>

                        <Cell size="shrink">
                          {this.props.icon}
                        </Cell>
                    </GridX>
                </View>
                {this.props.errorMessage && (
                  <Text style={{color: colors.error, marginBottom: 10}}>{this.props.errorMessage}</Text>
                )}
            </View>
        );
    }

    render() {
        return Platform.OS === 'ios' ? this.renderIOS() : this.renderAndroid();
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

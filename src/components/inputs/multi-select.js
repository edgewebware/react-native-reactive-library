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
    ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {GridX, Cell} from 'react-native-reactive-library'

import Props, {propShapes, optionsByKey} from 'react-native-reactive-library/src/lib/prop'
import {input} from 'react-native-reactive-library/src/styles/components/input'
import {shared} from 'react-native-reactive-library/src/styles/components/shared'

import {get} from 'react-native-reactive-library/src/settings'

const colors = get.colors()

export default class RNPickerSelect extends PureComponent {
    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.any.isRequired,
                selected: PropTypes.bool,
            })
        ).isRequired,
        placeholder: PropTypes.string,
        hideDoneBar: PropTypes.bool,
        hideIcon: PropTypes.bool,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
        itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
        placeholder: 'Select One or More...',
    };

    focus() {
        this.setState({
            animationType: this.props.animationType,
            showPicker: true,
        });
    }

    constructor(props) {
        super(props);

        const items = props.items
        const selectedItems = this.getSelectedItems(items);

        this.state = {
            items,
            selectedItems,
            showPicker: false,
            animationType: undefined,
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.togglePicker = this.togglePicker.bind(this);
        this.onItemPress = this.onItemPress.bind(this);
    }

    onItemPress(itemPressed) {
        const newItems = this.state.items.map((item, index) => {
            if (itemPressed == item) {
                itemPressed.selected = !itemPressed.selected
                return itemPressed;
            }

            return item
        });

        const selectedItems = this.getSelectedItems(newItems);
        this.onValueChange(selectedItems.map(i => i.value));

        this.setState({items: newItems, selectedItems})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items != this.props.items) {
            this.setState({
                selectedItems: this.getSelectedItems(nextProps.items)
            });
        }
    }

    getSelectedItems(items) {
        return items.filter((item, index) => {
            return item.selected;
        });
    }


    getSelectedItemsLabels(items) {
        var selectedItems = items.filter((item, index) => {
            return item.selected;
        });

        return selectedItems.map(item => item.label)
    }

    onValueChange(selectedItems) {
        this.props.onValueChange(selectedItems);
    }

    togglePicker(animate = false) {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            animationType: animate ? this.props.animationType : undefined,
            showPicker: !this.state.showPicker,
        });
        if (!this.state.showPicker && this.inputRef) {
            this.inputRef.focus();
            this.inputRef.blur();
        }
    }

    closePicker() {
        if (this.props.disabled) {
            return;
        }

        if (this.inputRef) {
            this.inputRef.focus();
            this.inputRef.blur();
        }

        this.setState({
            animationType: this.props.animationType,
            showPicker: false,
        }, function() {
            if (this.props.onDone) {
                this.props.onDone();
            }
        });
    }

    renderItems() {
        return this.state.items.map((item, index) => {
            return (
                <TouchableOpacity
                    key={item.label}
                    onPress={() => this.onItemPress(item)}
                    disabled={item.value ? false : true}
                >
                    <GridX style={{height: 40, paddingHorizontal: 20, borderTopWidth: index == 0 ? 0 : 1, borderColor: colors.lightGray}} vAlign="middle">
                        <Cell size="1">
                            {item.value && item.selected && (
                                <View>{this.props.selectedIcon}</View>
                            )}
                        </Cell>
                        <Cell size="11">
                            <Text style={{fontSize: 14}}>{item.label}</Text>
                        </Cell>
                    </GridX>
                </TouchableOpacity>
            );
        });
    }

    renderDoneBar() {
        if (this.props.hideDoneBar) {
            return null;
        }

        return (
            <View style={[styles.modalViewMiddle, this.props.style.modalViewMiddle]}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }} />
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

        var selectedItemsText;

        if (this.state.selectedItems.length == 1) {
            selectedItemsText = this.state.selectedItems.map(i => i.label).join(', ')
        } else {
            selectedItemsText = this.state.selectedItems.filter(i => i.value).map(i => i.label).join(', ')
        }

        return (
          <View pointerEvents="box-only">
            <GridX vAlign="middle" style={[
                shared.styles.wrapper,
                ...this.styles,
                style,
              ]}
              wrap={false}>

              <Cell size={this.props.icon ? 10 : 12}>
                  <TextInput
                    style={[this.textStyle, this.style]}
                    value={selectedItemsText}
                    ref={(ref) => {
                        this.inputRef = ref;
                    }}/>
              </Cell>

              {this.props.icon && (<Cell size="2">
                {this.props.icon}
              </Cell>)}
            </GridX>
          </View>
        );
    }

    renderIOS() {
        return (
            <View>
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
                            <ScrollView>
                                {this.renderItems()}
                            </ScrollView>
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
        return (
            <View>
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
                        animationType="fade"
                        transparent
                        supportedOrientations={['portrait', 'landscape']}
                        onRequestClose={() => this.togglePicker(false)}
                    >
                        <View style={styles.modalView}>
                          <View style={styles.modalContainer}>
                              <ScrollView>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.closePicker();
                                    }}
                                >
                                  <View>
                                    <Text style={[styles.doneAndroid, styles.underline, this.props.style.done]}>
                                        {this.props.doneText}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                  {this.renderItems()}
                              </ScrollView>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.togglePicker(false)}
                            activeOpacity={0.8}
                            style={styles.modalBackground}
                          />
                      </View>
                    </Modal>
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
    modalView: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3
    },
    modalBackground: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      zIndex: 1,
      top: 0,
      opacity: 0.8
    },
    modalContainer: {
      width: '95%',
      zIndex: 2,
      backgroundColor: 'white'
    },
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
        backgroundColor: 'white',
    },
    done: {
        color: '#007AFE',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 18,
    },
    doneAndroid: {
        color: '#888988',
        padding: 10,
        fontSize: 18,
        textAlign: 'right',
        borderBottomWidth: 1,
        borderColor: '#888988'
    },
    underline: {
        borderTopWidth: 1,
        borderTopColor: '#888988',
        marginHorizontal: 4,
    },
});

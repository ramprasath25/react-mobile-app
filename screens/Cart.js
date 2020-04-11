import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';
import NumericInput from 'react-native-numeric-input';
import { connect } from 'react-redux';
import { Icon, Product } from '../components/';
import { CheckOut } from '../action';
import { bindActionCreators } from 'redux';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            street: '',
            area: '',
            landmark: ''
        }
    }
    handClick() {
        this.props.CheckOut(this.state);
    }
    renderProducts = () => {
        const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
        let totalCartPrize = 0;
        this.props.products.forEach(item => {
            totalCartPrize += item.price * item.selectedQuantity
        });

        return (

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.products}>

                {/* List of products */}
                <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]} style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15 }}>
                    <Text p>Item Details</Text>
                    {
                        this.props.products.map((item, index) => {
                            if (item.selectedQuantity !== 0) {
                                let productPrice = item.selectedQuantity * item.price;
                                return (
                                    <Block card style={styles.productDescription} style={{ marginVertical: 5, padding: 15, flex: 1, flexDirection: 'row' }} key={index}>
                                        <View style={{ width: '70%' }}>
                                            <Text size={14} >{item.title} | {item.quantity}</Text>
                                            <Text size={14} >Rs.{item.price} x {item.selectedQuantity}</Text>
                                        </View>
                                        <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                            <Text size={14} muted={!priceColor} color={priceColor}>Rs. {productPrice}</Text>
                                        </View>
                                    </Block>
                                )
                            }
                        })
                    }
                </Block>
                {/* Calculation */}
                <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]} style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20, marginVertical: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomColor: '#efefef', borderBottomWidth: 1 }}>
                        <Text style={{ width: '70%' }}> Total Item</Text>
                        <View style={{ width: '30%', alignItems: 'flex-end' }}>
                            <Text muted={!priceColor} color={priceColor}> Rs. {totalCartPrize}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomColor: '#efefef', borderBottomWidth: 1 }}>
                        <Text style={{ width: '70%' }}> Delivery Charge</Text>
                        <View style={{ width: '30%', alignItems: 'flex-end' }}>
                            <Text muted={!priceColor} color={priceColor}> Rs. 0</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomColor: '#efefef', borderBottomWidth: 1 }}>
                        <Text style={{ width: '70%' }} bold={true}> Grand Total</Text>
                        <View style={{ width: '30%', alignItems: 'flex-end' }}>
                            <Text muted={!priceColor} color={priceColor} bold={true}> Rs. {totalCartPrize}</Text>
                        </View>
                    </View>
                </Block>
                {/* Address */}
                <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]} style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20, marginVertical: 10 }}>
                    <Text>Delivery Details</Text>
                    <Input placeholder="Name" onChangeText={(value) => this.setState({ name: value })}
                        right
                        icon="user"
                        family="antdesign"
                        iconSize={14}
                        iconColor="grey"
                        color="black"
                        style={this.state.name == 0 ? { borderColor: "red" } : ''}
                        help={this.state.name == 0 ? "Please fill Name" : ' '}
                    />
                    <Input placeholder="Mobile No" onChangeText={(mobile) => { this.setState({ mobile: mobile }) }}
                        right
                        icon="phone"
                        family="antdesign"
                        iconSize={14}
                        iconColor="grey"
                        color="black"
                        type="number-pad"
                        style={this.state.mobile == 0 ? { borderColor: "red" } : ''}
                        help={this.state.mobile == 0 ? "Please fill Mobile No" : ' '}
                    />
                    <Input placeholder="Home No, Street Address" onChangeText={(street) => { this.setState({ street: street }) }}
                        right
                        icon="pushpin"
                        family="antdesign"
                        iconSize={14}
                        iconColor="grey"
                        color="black"
                        style={this.state.street == 0 ? { borderColor: "red" } : ''}
                        help={this.state.street == 0 ? "Please fill Address" : ' '}
                    />
                    <Input placeholder="Area" onChangeText={(area) => { this.setState({ area: area }) }}
                        right
                        icon="tag"
                        family="antdesign"
                        iconSize={14}
                        iconColor="grey"
                        color="black" />
                    <Input placeholder="Landmark" onChangeText={(landmark) => { this.setState({ landmark: landmark }) }}
                        right
                        icon="flag"
                        family="antdesign"
                        iconSize={14}
                        iconColor="grey"
                        color="black" />
                </Block>
                <Button color="success" onPress={this.handClick.bind(this)}>
                    Place Order
                </Button>

            </ScrollView>
        )
    }

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderProducts()}
            </Block>
        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        CheckOut,
    }, dispatch)
);
const mapStateToProps = (state) => {
    const { products } = state;
    return products
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
    header: {
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        elevation: 4,
        zIndex: 2,
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
    },
    tab: {
        backgroundColor: theme.COLORS.TRANSPARENT,
        width: width * 0.50,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '300'
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: theme.COLORS.MUTED,
    },
    products: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
    },
});
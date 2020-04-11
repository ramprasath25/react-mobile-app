import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import NumericInput from 'react-native-numeric-input';
import materialTheme from '../constants/Theme';
import { AddItemCart } from '../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { width } = Dimensions.get('screen');

class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  addToCart(value, _id) {
    let data = {
      _id: _id,
      selectedQuantity: value
    }
    this.props.AddItemCart(data);
  }
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    
    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: product.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{product.title}</Text>
            <NumericInput onChange={value => this.addToCart(value, product._id)} minValue={0} initValue={product.selectedQuantity} maxValue={100} totalHeight={35} />
            <Text size={14} muted={!priceColor} color={priceColor} style={{ paddingTop: 8 }}>Rs.{product.price} | {product.quantity}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    AddItemCart,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(withNavigation(Product));

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
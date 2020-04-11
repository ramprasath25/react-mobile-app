import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { NavigationEvents } from 'react-navigation';
import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate('')}
      />
    )
  }

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <StatusBar barStyle="dark-content" />
        <Button shadowless style={[styles.tab, styles.divider]}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>
        </Button>
      </Block>
    )
  }

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          {
            this.props.products.map((item, index) => {
              return <Product product={item} horizontal key={index} />
            })
          }
        </Block>
      </ScrollView>
    )
  }
  toastButton = () => {
    const { navigation } = this.props;
    let totalQty = 0;
    this.props.products.forEach(item => {
      totalQty += item.selectedQuantity;
    });
    if (totalQty !== 0) {
      return (
        <TouchableOpacity style={{ marginBottom: 30, alignSelf: 'flex-end', marginHorizontal: 30 }}>
          <Button onlyIcon icon="shoppingcart" iconFamily="antdesign" iconSize={30} color="success" iconColor="#fff" style={{ width: 60, height: 60 }} onPress={() => navigation.navigate('Cart')}>Shopping Cart</Button>
        </TouchableOpacity>
      )
    }
  }
  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
        {this.toastButton()}
      </Block>
    );
  }
}
const mapStateToProps = (state) => {
  const { products } = state;
  return products
}
export default connect(mapStateToProps, null)(Home);
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

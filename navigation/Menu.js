import React from "react";
import { DrawerItems } from 'react-navigation';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Icon } from '../components/';
import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get('screen');
// { uri: 'http://niruhomefoods.com/img/logo.png' }
const Drawer = (props) => (
  <Block style={styles.container} forceInset={{ horizontal: 'never' }}>
    <Block flex={0.2} style={styles.header}>
      <Block flex center style={styles.profile}>
        <Image source={require('../assets/images/logo.png')} style={styles.avatar} />
      </Block>
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
  </Block>
);


const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: 'white',
  drawerWidth: width * 0.7,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#000',
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.6,
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal',
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 7,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // paddingHorizontal: 28,
    // paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    // marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 125,
    width: 125,
  },
  seller: {
    marginRight: 16,
  }
});

export default Menu;

import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <ImageBackground source={require('../assets/images/splash.png')} style={{ width: '100%', height: '100%' }}>
          <StatusBar barStyle="dark-content" />
          <Block flex center>
            <ImageBackground
              source={{ uri: Images.Onboarding }}
              style={{ height: 350, width: 350, marginTop: '30%', zIndex: 1 }}
            />
          </Block>
          <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block center>
                <Block>
                  <Text color="white" size={32}>Niru Home Foods</Text>
                </Block>
                <Text size={16} color='rgba(255,255,255,0.6)'>
                  Mother’s love unconditionally
              </Text>
              </Block>
              <Block center>
                <Button
                  shadowless
                  style={styles.button}
                  color={materialTheme.COLORS.BUTTON_COLOR}
                  onPress={() => navigation.navigate('Home')}>
                  GET STARTED
              </Button>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

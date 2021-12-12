import {colorGlobal} from '@config/colorGlobal';
import * as React from 'react';
import {StyleSheet, Image, ImageSourcePropType} from 'react-native';
const HEADER_SIZE = 55;

interface IHeaderBannerProps {
  imgBanner?: ImageSourcePropType;
  onPressLink?: '';
}

const HeaderBanner = (props: IHeaderBannerProps) => {
  const {imgBanner} = props;
  return (
    <>
      <Image
        style={styles.container}
        source={
          imgBanner !== '' && imgBanner !== undefined
            ? imgBanner
            : require('../../../assets/img/logoBanner.png')
        }
        resizeMode="contain"
      />
    </>
  );
};

export default HeaderBanner;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: HEADER_SIZE,
    backgroundColor: colorGlobal.backgroundGlobal,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

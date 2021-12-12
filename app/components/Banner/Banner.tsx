import {colorGlobal} from '@config/colorGlobal';
import * as React from 'react';
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Linking,
  View,
  ImageBackground,
} from 'react-native';
const HEADER_SIZE = 55;

interface IHeaderBannerProps {
  imgBanner?: ImageSourcePropType;
  onPressLink?: () => void;
  onPressClose?: () => void;
}

const Banner = (props: IHeaderBannerProps): any => {
  const {imgBanner, onPressLink} = props;
  const [showBanner, setShowBanner] = React.useState(true);
  return (
    showBanner &&
    imgBanner !== undefined && (
      <TouchableOpacity
        activeOpacity={1}
        style={{flexDirection: 'row'}}
        onPress={onPressLink}>
        <ImageBackground
          style={styles.container}
          source={
            imgBanner !== '' || undefined
              ? imgBanner
              : require('../../assets/logo/bootsplash_logo_original.png')
          }
          resizeMode="contain">
          <TouchableOpacity style={{}} onPress={() => setShowBanner(false)}>
            <Image
              source={require('../../assets/img/closeIcon.png')}
              style={styles.iconClose}
            />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    )
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_SIZE,
    backgroundColor: colorGlobal.backgroundGlobal,
    alignItems: 'flex-end',
  },
  iconClose: {
    width: 15,
    height: 15,
  },
});

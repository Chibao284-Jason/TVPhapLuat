import React, {useEffect, useState} from 'react';
import {Text, View, Image, ImageSourcePropType, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
import {styles} from './styles';
import {colorGlobal} from '@config/colorGlobal';
// import DeviceBrightness from '@adrianso/react-native-device-brightness';

interface ModalBrightnessProps {
  title?: string;
  image?: ImageSourcePropType;
  font?: string;
  fontSize?: number;
  colorSlider?: string;
}

const handleBrightness = async (value: number) => {
  // DeviceBrightness.setBrightnessLevel(value);
};
const ModalBrightness = (props: ModalBrightnessProps) => {
  const {title, image, font, fontSize, colorSlider} = props;
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    // requestPer();
  }, []);

  // const requestPer = async () => {
  //   let brightness;
  //   if (Platform.OS === 'android') {
  //     brightness = await DeviceBrightness.getSystemBrightnessLevel();
  //   } else {
  //     brightness = await DeviceBrightness.getBrightnessLevel();
  //   }
  //   setSliderValue(brightness);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.viewLabel}>
        <Image
          source={
            image
              ? image
              : {
                  uri: 'https://icon-library.com/images/brightness-icon/brightness-icon-6.jpg',
                }
          }
          style={styles.imgIcon}
        />
        <View style={styles.title}>
          <Text style={styles.titleStyles(font, fontSize)}>
            {title ? title : 'Title'}
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Slider
          style={{width: 200}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={
            colorSlider ? colorSlider : colorGlobal.sliderDefault
          }
          maximumTrackTintColor="gray"
          value={sliderValue}
          onValueChange={value => handleBrightness(value)}
        />
      </View>
    </View>
  );
};

export default ModalBrightness;

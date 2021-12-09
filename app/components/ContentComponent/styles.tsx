import {colorGlobal} from '@config/colorGlobal';
import {ViewStyle, TextStyle, Dimensions, ImageStyle} from 'react-native';
const width = Dimensions.get('window').width / 2 - 30;
export type Styles = {
  container: ViewStyle;
  containerContent: ViewStyle;
  thumbnailAudio: ViewStyle;
  thumbnailVideo: ViewStyle;
  audioControl: ViewStyle;
  viewAudio: ViewStyle;
  viewSound: ViewStyle;
  viewLabel: ViewStyle;
  title: ViewStyle;
  imgSound: ImageStyle;
  imgIcon: ImageStyle;
  headingTitle: (font?: string, fontSize?: number) => TextStyle;
  textCreate: (font?: string, fontSize?: number) => TextStyle;
  textPause: (font?: string, fontSize?: number) => TextStyle;
  textHeaderContent: (font?: string, fontSize?: number) => TextStyle;
  titleStyles: (font?: string, fontSize?: number) => TextStyle;
  textBodyContent: (font?: string, fontSize?: number) => any; // render HTML
};
const scale = (size: number, fontSize?: number) => {
  if (fontSize) {
    return size * (fontSize / 18);
  }
  size;
};
export const styles: Styles = {
  container: {
    flex: 1,
  },

  headingTitle: (font, fontSize) => ({
    fontSize: scale(30, fontSize),
    fontWeight: '600',
    fontFamily: font ? font : 'Arial',
  }),
  textCreate: (font, fontSize) => ({
    color: colorGlobal.timeCreateColor,
    fontFamily: font ? font : 'Arial',
    marginVertical: 10,
    fontSize: scale(14, fontSize),
    textAlignVertical: 'center',
  }),
  textPause: (font, fontSize) => ({
    color: colorGlobal.titleNews,
    fontFamily: font ? font : 'Arial',
    marginVertical: 10,
    fontSize: scale(14, fontSize),
    textAlignVertical: 'center',
    marginLeft: 10,
  }),
  textHeaderContent: (font, fontSize) => ({
    fontWeight: 'bold',
    fontFamily: font ? font : 'Arial',
    marginVertical: 10,
    fontSize: scale(18, fontSize),
    lineHeight: scale(30, fontSize),
  }),
  textBodyContent: (font, fontSize) => ({
    fontFamily: font ? font : 'Arial',
    marginVertical: 10,
    fontSize: scale(18, fontSize),
    lineHeight: scale(30, fontSize),
  }),
  thumbnailAudio: {
    // width: '100%',
    // height: 50,
    alignItems: 'center',
    // backgroundColor: colorGlobal.textInputBg,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    flexDirection: 'row',
  },
  imgSound: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  thumbnailVideo: {
    position: 'relative',
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  audioControl: {
    height: 0,
  },
  viewAudio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSound: {
    marginLeft: 15,
    flexDirection: 'row',
    flex: 1,
  },
  containerContent: {
    paddingHorizontal: 10,
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIcon: {
    width: 20,
    height: 20,
  },
  titleStyles: (font, fontSize) => ({
    fontFamily: font ? font : 'Arial',
    fontSize: scale(14, fontSize),
  }),
  title: {
    marginLeft: 10,
  },
};

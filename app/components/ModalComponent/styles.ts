import { colorGlobal } from "@config/colorGlobal";
import { TextStyle, ViewStyle, ImageStyle } from "react-native";
type Styles = {
  container: ViewStyle;
  viewLabel: ViewStyle;
  imgIcon: ImageStyle;
  imgIconTick: (color?: string) => ImageStyle;
  imgArrow: ImageStyle;
  title: ViewStyle;
  viewDotColor: (color: string) => ViewStyle;
  check: (color: string) => ViewStyle;
  unCheck: ViewStyle;
  buttonFont: (color: string) => ViewStyle;
  labelFonts: (font?: string) => TextStyle;
  titleStyles: (font?: string, fontSize?: number) => TextStyle;
  containerTheme: ViewStyle;
  viewButtonFont: ViewStyle;
};

export const styles: Styles = {
  container: {
    // margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIcon: {
    width: 20,
    height: 20,
  },
  imgIconTick: (color) => ({
    width: 20,
    height: 20,
    backgroundColor: color ? color : 'transparent',
    borderRadius: 5
  }),
  title: {
    marginLeft: 10,
  },
  viewDotColor: color => ({
    backgroundColor: color ? color : 'red',
    width: 15,
    height: 15,
    borderRadius: 10,
  }),
  check: color => ({
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    marginLeft: 20,
    borderColor: color ? color : 'red'
  }),
  unCheck: {
    marginLeft: 20,
  },
  imgArrow: {
    width: 20,
    height: 25,
  },
  buttonFont: color => ({
    backgroundColor: color ? color : colorGlobal.buttonFont,
    borderRadius: 20,
    marginHorizontal: 5,
    flex: 1,
  }),
  labelFonts: (font) => ({
    color: colorGlobal.textWhite,
    fontSize: 18,
    margin: 10,
    fontWeight: '300',
    fontFamily: font ? font : 'Arial',
  }),

  containerTheme: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  titleStyles: (font, fontSize) => ({
    fontFamily: font ? font : 'Arial',
    fontSize: fontSize ? fontSize : 18
  }),
  viewButtonFont: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
};

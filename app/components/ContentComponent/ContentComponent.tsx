import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import {} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {styles} from './styles';
import {
  IChangeThemeFontFamilyReducer,
  IChangeThemeFontSizeReducer,
} from '@models/reducers/changeTheme';
import {IDataDetailNews} from '@models/actions/getDetailNews';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import VideoPlayer from 'react-native-video-controls';
import {Image} from 'react-native-elements/dist/image/Image';
import {yesterday, lastM, lastW, lastY} from '@constants/dateConstant';
import {useNavigation} from '@react-navigation/native';
import {Actions} from '@store/actions';
import {IPlayVideo} from '@store/reducers/autoPlayVideoReducer';
import {IDataBannerState} from '@screens/HomeScreen/types';
import Banner from '@components/Banner/Banner';
interface IContentComponentProps {
  dataDetail: IDataDetailNews;
}
interface IReducer {
  ChangeFontReducer: IChangeThemeFontFamilyReducer &
    IChangeThemeFontSizeReducer;
}
interface IAutoPlayVideoReducer {
  autoPlayVideoReducer: IPlayVideo;
}

const ContentComponent = (props: IContentComponentProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [pausedAudio, setPausedAudio] = useState(true);
  const [onEnd, setOnEnd] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const ChangeFontReducer = useSelector(
    (state: IReducer) => state.ChangeFontReducer,
  );
  const autoPlayVideoReducer = useSelector(
    (state: IAutoPlayVideoReducer) => state.autoPlayVideoReducer.playVideo,
  );

  const bannerData = useSelector(
    (state: IDataBannerState) => state.bannerReducer,
  );
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    setPaused(autoPlayVideoReducer);
  }, [autoPlayVideoReducer]);
  const {font, fontSize} = ChangeFontReducer;
  const {dataDetail} = props;
  const {
    title,
    audio,
    cat,
    content,
    count_view,
    datetime,
    desc,
    keywords,
    video,
    link,
  } = dataDetail;
  let timeCreate = moment(datetime).fromNow();
  let dateTemp = moment(datetime);

  if (dateTemp.format('D/M/Y') === yesterday) {
    timeCreate = moment(datetime).calendar(null, {lastDay: '[hôm qua]'});
  }
  if (dateTemp.format('M') === lastM.format('M')) {
    timeCreate = moment(datetime)
      .calendar()
      .replace(dateTemp.format('DD/MM/YYYY'), 'tháng trước');
  }
  if (dateTemp.format('D/M/Y') === lastW.format('D/M/Y')) {
    timeCreate = moment(datetime)
      .calendar()
      .replace(lastW.format('D/M/Y'), 'tuần trước');
  }
  if (dateTemp.format('Y') === lastY.format('Y')) {
    timeCreate = moment(datetime)
      .calendar()
      .replace(dateTemp.format('DD/MM/YYYY'), 'năm trước');
  }
  const {width} = useWindowDimensions();
  const source = {
    html: `${content}`,
  };
  let player = React.useRef;
  const onPlayVideo = (isPlay: boolean) => {
    setPausedAudio(true);
    setPaused(!isPlay);
  };
  const onPlayAudio = (isPlayAudio: boolean) => {
    setPausedAudio(!isPlayAudio);
    setPaused(true);
  };
  const onEndBack = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const windowHeight = Dimensions.get('window').height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height + 200) {
      if (onEnd) {
        navigation.goBack();
        setOnEnd(false);
      }
    }
  };
  const handlePress = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);
  const onShare = async () => {
    try {
      const result = await Share.share({
        url: link,
        // url: `https://www.youtube.com/results?search_query=mu+vs+crystal+palace`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      onScroll={e => onEndBack(e)}>
      {video !== '' && (
        <>
          <VideoPlayer
            source={{uri: video}}
            controls={false}
            paused={paused}
            style={styles.thumbnailVideo}
            ignoreSilentSwitch={'ignore'}
            toggleResizeModeOnFullscreen={false}
            fullscreen={fullScreen}
            onEnterFullscreen={() => setFullScreen(true)}
            onExitFullscreen={() => setFullScreen(false)}
            disableBack={true}
            onPlay={() => {
              onPlayVideo(true);
              dispatch(Actions.autoPlayVideRequestActions(false));
            }}
            onPause={() => {
              onPlayVideo(false);
              dispatch(Actions.autoPlayVideRequestActions(true));
            }}
          />
        </>
      )}
      <View style={styles.containerContent}>
        <View>
          <Text style={styles.headingTitle(font, fontSize)}>{title}</Text>
        </View>
        <View style={styles.viewAudio}>
          <Text style={styles.textCreate(font, fontSize)}>{timeCreate}</Text>
          {audio !== '' && (
            <View style={styles.viewSound}>
              <TouchableOpacity
                style={styles.thumbnailAudio}
                onPress={() => {
                  onPlayAudio(!pausedAudio);
                  setPausedAudio(!pausedAudio);
                }}>
                <Image
                  source={require('../../assets/img/sound.png')}
                  style={styles.imgSound}
                />
                <Text style={styles.textPause(font, fontSize)}>
                  {pausedAudio ? 'nghe tin' : 'đang phát'}
                </Text>
              </TouchableOpacity>
              <VideoPlayer
                source={{uri: audio}}
                ignoreSilentSwitch={'ignore'}
                controls={false}
                paused={pausedAudio}
                audioOnly={false}
                repeat={false}
                style={styles.audioControl}
              />
              <TouchableOpacity
                style={styles.viewLabel}
                onPress={() => onShare()}>
                <Image
                  source={require('../../assets/img/iconShare.png')}
                  style={styles.imgIcon}
                />
                <View style={styles.title}>
                  <Text style={styles.titleStyles(font, fontSize)}>
                    Chia sẻ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {bannerData.dataBanner &&
          bannerData.dataBanner.bottom &&
          bannerData.dataBanner.bottom.image !== undefined && (
            <Banner
              imgBanner={{uri: bannerData.dataBanner.bottom.image}}
              onPressLink={() => handlePress(bannerData.dataBanner.bottom.link)}
            />
          )}

        <Text style={styles.textHeaderContent(font, fontSize)}>{desc}</Text>
        <RenderHtml
          baseStyle={styles.textBodyContent(font, fontSize)}
          systemFonts={[font]}
          enableUserAgentStyles={true}
          contentWidth={width}
          source={source}
        />
      </View>
    </ScrollView>
  );
};

export default ContentComponent;

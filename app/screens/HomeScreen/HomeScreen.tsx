import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Linking} from 'react-native';
import {screenName} from '@navigation/screenName';
import ListNewsScreen from '@screens/ListNewsScreen/ListNewsScreen';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {colorGlobal, colorTabBar} from '@config/colorGlobal';
import HeaderBanner from '@components/HeaderComponent/HeaderBanner/HeaderBanner';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Actions} from '@store/actions';
import ViewLoadingComponent from '@components/ViewLoadingComponent/ViewLoadingComponent';
import {
  IHeaderComponentProps,
  IListTabState,
  IListNewsState,
  IListNewsCatsState,
  IDataBannerState,
} from './types';
import {IconMenu} from '@components/IconMenuComponent/IconMenu';
import {TabBarItem} from '@components/TabBarItemComponent/TabBarItem';
import ImageViewLoading from '@components/ImagePlaceholder/index';
import ImagePlaceholder from '@components/ImagePlaceholder/ImagePlaceholder';
import Banner from '@components/Banner/Banner';
const HomeScreen = (props: IHeaderComponentProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [pressCats, setPressCats] = useState<boolean>(false);
  const [pageCurrent, setPageCurrent] = useState(2);
  const [idCatsCurrent, setIdCatsCurrent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataNews, setDataNews] = useState<any>(null);
  const [dataBanner, setDataBanner] = useState<any>(null);
  useEffect(() => {
    dispatch(Actions.getListTabRequest());
    dispatch(
      Actions.getListNewsRequestActions({
        limit: '20',
        page: '1',
      }),
    );
    dispatch(Actions.getBannerRequestActions());
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, []);
  useEffect(() => {
    if (route.params !== undefined) {
      setIdCatsCurrent(route.params.filters.News_Cats);
    }
  }, [route.params]);

  const onPressCategories = async (item: any) => {
    let idCategories = item.id;
    if (item.id === 10000) idCategories = 0;
    await dispatch(
      Actions.getCatsListNewsRequestActions({
        filters: {News_Cat: idCategories},
        limit: '20',
        page: '1',
      }),
    );
    setPressCats(true);
    setPageCurrent(2);
    setIdCatsCurrent(idCategories);
  };
  const onLoadMore = () => {
    if (idCatsCurrent !== '') {
      if (pressCats) {
        dispatch(
          Actions.getMoreCatsListNewsRequestActions({
            filters: {News_Cat: idCatsCurrent},
            limit: '20',
            page: pageCurrent.toString(),
          }),
        );
        setPageCurrent(pageCurrent + 1);
        return;
      } else {
        dispatch(
          Actions.getCatsListNewsRequestActions({
            filters: {News_Cat: idCatsCurrent},
            limit: '20',
            page: pageCurrent.toString(),
          }),
        );
        setPageCurrent(pageCurrent + 1);
        return;
      }
    }
    if (pressCats) {
      dispatch(
        Actions.getMoreCatsListNewsRequestActions({
          limit: '20',
          page: pageCurrent.toString(),
        }),
      );
      setPageCurrent(pageCurrent + 1);
    } else {
      dispatch(
        Actions.getListNewsRequestActions({
          limit: '20',
          page: pageCurrent.toString(),
        }),
      );
      setPageCurrent(pageCurrent + 1);
    }
  };

  const listTabReducer = useSelector(
    (state: IListTabState) => state.listTabReducer,
  );
  const listNewsReducer = useSelector(
    (state: IListNewsState) => state.listNewsReducer,
  );
  const listNewsCatsReducer = useSelector(
    (state: IListNewsCatsState) => state.listNewsCatsReducer,
  );
  const bannerData = useSelector(
    (state: IDataBannerState) => state.bannerReducer,
  );
  const dataCategories = listTabReducer.data.data;
  const isLoadingListTab = listTabReducer.isLoading;
  const isLoadingListNews = listNewsReducer.isLoading;
  const dataListNews = listNewsReducer.data;
  const dataListNewsCats = listNewsCatsReducer.data;
  const isLoadingListNewsCats = listNewsCatsReducer.isLoading;
  const isLoadingMoreListNewsCats = listNewsCatsReducer.isLoadingMore;

  useEffect(() => {
    if (!isLoadingListNews) {
      setDataNews(dataListNews);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 550);
    }
  }, [isLoadingListNews]);

  const handlePress = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);

  return (
    <>
      {!isLoadingListTab && dataCategories ? (
        <View style={styles.container}>
          <View style={styles.viewHeader}>
            <View>
              <TouchableOpacity
                style={styles.viewBanner}
                onPress={() => {
                  // onPressCategories({id: 10000});
                  const urlBanner = bannerData.dataBanner.top.link;
                  if (urlBanner !== '') handlePress(urlBanner);
                }}>
                <HeaderBanner
                  // imgBanner={require('../../assets/img/logoBanner.gif')}
                  imgBanner={{
                    uri: 'https://sao.baophapluat.vn/default/template/img/logophapluatsao.gif',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <LinearGradient
                colors={colorTabBar}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.tabBar}>
                <TouchableOpacity
                  style={[styles.tabItem]}
                  onPress={() => {
                    navigation.navigate(screenName.MENU_SCREEN as never);
                  }}>
                  <IconMenu
                    img={{
                      uri: 'https://icon-library.com/images/menu-icon-png-3-lines/menu-icon-png-3-lines-5.jpg',
                    }}
                  />
                </TouchableOpacity>
                <FlatList
                  horizontal={true}
                  scrollEnabled={true}
                  data={dataCategories}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.viewTabBar}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => {
                    return (
                      <TabBarItem
                        name={item.name}
                        isFocus={item.isFocus}
                        onPress={() => {
                          onPressCategories(item);
                        }}
                      />
                    );
                  }}
                />
                <TouchableOpacity
                  style={[styles.tabItem]}
                  onPress={() => {
                    navigation.navigate(screenName.SEARCH_SCREEN as never);
                  }}>
                  <Icon
                    name="search"
                    size={30}
                    color={colorGlobal.iconSearchColor}
                    tvParallaxProperties={undefined}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          {!isLoadingListNewsCats && dataNews !== null ? (
            <>
              <FlatList
                style={styles.containerBody}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={3}
                scrollEventThrottle={10}
                scrollEnabled={true}
                data={!pressCats ? dataNews.rows : dataListNewsCats.rows}
                onEndReached={({distanceFromEnd}) => {
                  if (distanceFromEnd < 50) return;
                  onLoadMore();
                }}
                ListFooterComponent={
                  isLoadingMoreListNewsCats ? <ImagePlaceholder /> : null
                }
                renderItem={({item}) => {
                  return <ListNewsScreen items={item} />;
                }}
              />
              {bannerData.dataBanner &&
                bannerData.dataBanner.bottom &&
                bannerData.dataBanner.bottom.image !== undefined && (
                  <Banner
                    imgBanner={{uri: bannerData.dataBanner.bottom.image}}
                    onPressLink={() =>
                      handlePress(bannerData.dataBanner.bottom.link)
                    }
                  />
                )}
            </>
          ) : (
            <ImageViewLoading />
          )}
        </View>
      ) : (
        <ViewLoadingComponent />
      )}
    </>
  );
};
export default HomeScreen;

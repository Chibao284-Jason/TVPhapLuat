
import { IDataBanner, IGetBannerRequestActions, IGetBannerSuccessActions } from "@models/actions/getBanner";
import { IErrorAction } from "@models/interface";
import * as types from "@store/actions/types";

export interface IDataBannerReducer {
  isLoadingBanner: boolean,
  dataBanner: IDataBanner,
  error: string
}
const initialState: IDataBannerReducer = {
  isLoadingBanner: false,
  dataBanner: {} as IDataBanner,
  error: ''
}

export const bannerReducer = (state = initialState, action: IGetBannerRequestActions & IGetBannerSuccessActions & IErrorAction) => {
  switch (action.type) {
    case types.GET_BANNER_REQUEST:
      return {
        ...state,
        isLoadingBanner: true
      };
    case types.GET_BANNER_SUCCESS:
      return {
        ...state,
        isLoadingBanner: false,
        dataBanner: action.data

      };
    case types.GET_BANNER_FAILURE:
      return {
        ...state,
        isLoadingBanner: false,
        error: action.error
      };

    default:
      return state

  }

}

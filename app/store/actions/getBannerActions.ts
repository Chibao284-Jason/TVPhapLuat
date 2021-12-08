import { IGetBannerRequestActions, IDataBanner, IGetBannerSuccessActions } from "@models/actions/getBanner";
import { IError, IErrorAction } from "@models/interface";
import * as types from "./types";

export const getBannerRequestActions = (): IGetBannerRequestActions => ({
  type: types.GET_BANNER_REQUEST,
})
export const getBannerSuccessActions = (data: IDataBanner): IGetBannerSuccessActions => ({
  type: types.GET_BANNER_SUCCESS,
  data: data
})
export const getBannerFailureActions = (error: any): IErrorAction => ({
  type: types.GET_BANNER_FAILURE,
  error: error.message
})

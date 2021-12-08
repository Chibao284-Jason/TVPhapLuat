import { put, takeLatest } from 'redux-saga/effects';
import * as types from '@store/actions/types';
import { getBannerApi } from '@store/api/getBannerApi';
import { Actions } from '@store/actions';
export function* getBannerSaga() {
  try {
    const { data } = yield getBannerApi();
    if (data.success === 1) {
      yield put(Actions.getBannerSuccessActions(data.data))

    } else {
      yield put(Actions.getBannerFailureActions(data.message))
    }
  } catch (error) {
    yield put(Actions.getBannerFailureActions(error))
  }
}



export function* watchGetBanner() {
  yield takeLatest(types.GET_BANNER_REQUEST, getBannerSaga);
}
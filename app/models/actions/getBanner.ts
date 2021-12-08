export interface IGetBannerRequestActions {
  type: string;
}
export interface IGetBannerSuccessActions {
  type: string;
  data: IDataBanner
}



export interface IDataBanner {
  top: ITopBanner
  bottom: IBottomBanner
}

export interface ITopBanner {
  title: string
  id: number
  image: string
  link: string
  code: string
}

export interface IBottomBanner {
  title: string
  id: number
  image: string
  link: string
  code: string
}
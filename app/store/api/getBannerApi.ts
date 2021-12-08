const axios = require('axios');
export const getBannerApi = () => {
  const config = {
    method: 'get',
    url: 'https://tvphapluat.vn/api/banner/',
    headers: {},
  };
  return axios(config)
    .then(function (response: any) {

      return response
    })
    .catch(function (error: any) {
      return error
    });
}
